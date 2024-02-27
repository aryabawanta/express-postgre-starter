const errorMessages: Record<number, string> = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  422: 'Unprocessable Entity',
  500: 'Internal Server Error',
}

export function createError(status: number, message?: string, response?: any): Error {
  const error = new Error(message || errorMessages[status]) as any;
  error.message = message || errorMessages[status];
  error.status = status;
  error.response = response;
  return error;
}