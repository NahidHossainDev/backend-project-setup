import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { errorLogger, logger } from './shared/logger';

process.on('uncaughtException', error => {
  errorLogger.error(error);
  process.exit(1);
});

let server: Server;

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info('Mongo server connected!');

    server = app.listen(config.port, () => {
      logger.info(`Server listening on port ${config.port}`);
    });
  } catch (error) {
    errorLogger.error('Failed to connect with DB.' + error);
  }

  process.on('unhandledRejection', async error => {
    errorLogger.error('Server is shutting down for unhandle rejection!');

    if (server) {
      try {
        server.close(err => {
          if (err) errorLogger.error(err);
          else errorLogger.error(error);
          process.exit(1);
        });
      } catch (err) {
        errorLogger.error(err);
      }
    } else {
      process.exit(1);
    }
  });
}

bootstrap();

process.on('SIGTERM', () => {
  logger.info('SIGTERM is closed');
  if (server) {
    server.close();
  }
  process.exit(1);
});
