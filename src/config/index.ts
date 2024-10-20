import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.MONGO_DB_URI,
  redisURL: process.env.REDIS_URL,
  redisExpireIn: process.env.REDIS_EXPIRE_IN,
  authService: process.env.AUTH_SERVICE,
  coreService: process.env.CORE_SERVICE,
};
