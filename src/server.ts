import mongoose from 'mongoose'
import app from './app'
import config from './config'

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url)
    console.log('Database connection successfully done!')

    app.listen(config.port, () => {
      console.log(`App listening on port ${config.port}`)
    })
  } catch (error) {
    console.log('Failed to connect with DB.' + error)
  }
}

bootstrap()
