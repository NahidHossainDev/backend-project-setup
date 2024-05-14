import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'
import config from '../../config'
import {
  ApiError,
  handleMongooseValidationErr,
  handleZodError,
} from '../../error'
import { IGenericErrorMessage } from '../../interface/error'
import { errorLogger } from '../../shared/logger'

export const globalErrorHandler: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (config.env === 'development') console.log('Global error handler', error)
  else errorLogger.error('Globar error handler', error)

  let statusCode: number = error?.statusCode || 500
  const result: IGenericErrorMessage = {
    errorMessage: [],
    message: 'Something went wrong',
    success: false,
    stack: config.env !== 'production' ? error?.stack : undefined,
  }

  if (error.name === 'ValidationError') {
    result.errorMessage = handleMongooseValidationErr(error)
  } else if (error instanceof ZodError) {
    const { errorMessage, message, statusCode: code } = handleZodError(error)
    result.errorMessage = errorMessage
    result.message = message
    statusCode = code
  } else if (error instanceof ApiError) {
    result.message = error?.message
    result.errorMessage = error?.message
      ? [{ path: '', message: error?.message }]
      : []
  } else if (error instanceof Error) {
    result.message = error?.message
    result.errorMessage = error?.message
      ? [{ path: '', message: error?.message }]
      : []
  }

  if (config.env === 'production') {
    delete result?.stack
  }
  res.status(statusCode).json(result)
}
