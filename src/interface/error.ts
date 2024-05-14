type IErrorMsg = {
  path: string | number;
  message: string;
};

export type IGenericErrorMessage = {
  success: boolean;
  message: string;
  errorMessage: IErrorMsg[];
  stack?: string | undefined;
};

export type IGenericError = {
  statusCode: number;
  message: string;
  errorMessage: IErrorMsg[];
  stack?: string | undefined;
};
