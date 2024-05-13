import path from 'path'
import { createLogger, format, transports } from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'

const { combine, timestamp, label, printf } = format

const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp)
  const hour = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()

  return `${date.getFullYear()}:${date.getMonth()}:${date.getDate()} AT ${hour}:${minutes}:${seconds} [${label}] ${level}: ${message}`
})

function getTransport(folderNm: string) {
  let loggerTransports = []

  // if (config.env === 'production') {
  const fileTransport = new DailyRotateFile({
    filename: path.join(
      process.cwd(),
      'logs',
      'winston',
      folderNm,
      '%DATE%.log'
    ),
    datePattern: 'DD-MM-YYYY-HH-MM',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '1d',
  })
  loggerTransports = [fileTransport, new transports.Console()]
  // } else {
  // create console transport
  // const consoleTransport = new transports.Console()
  // loggerTransports = [consoleTransport]
  // }

  return loggerTransports
}

const logger = createLogger({
  level: 'info',
  format: combine(label({ label: 'info' }), timestamp(), myFormat),
  // defaultMeta: { service: 'auth-service' },
  transports: getTransport('successes'),
})

const errorLogger = createLogger({
  level: 'error',
  format: combine(label({ label: 'error' }), timestamp(), myFormat),
  // defaultMeta: { service: 'auth-service' },
  transports: getTransport('errors'),
})

export { errorLogger, logger }
