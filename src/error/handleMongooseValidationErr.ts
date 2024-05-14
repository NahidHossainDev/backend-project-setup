import { Error } from 'mongoose'

export const handleMongooseValidationErr = (err: Error.ValidationError) => {
  if (err?.errors) {
    return Object.values(err?.errors).map(el => ({
      path: el?.path,
      message: el?.message,
    }))
  }
  return []
}
