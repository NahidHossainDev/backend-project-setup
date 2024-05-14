import { ZodError } from 'zod';
import { IGenericError } from '../interface/error';

export const handleZodError = (error: ZodError): IGenericError => {
  const errorMessage = error?.issues?.map(err => ({
    path: err?.path[err.path.length - 1],
    message: err?.message.toString(),
  }));
  return {
    statusCode: 400,
    message: 'Validation Error',
    errorMessage,
  };
};
