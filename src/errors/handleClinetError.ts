import { Prisma } from '@prisma/client';
import { IGenericErrorMessage } from '../interfaces/error';

const handleClientError = (error: Prisma.PrismaClientKnownRequestError) => {
  let errors: IGenericErrorMessage[] = [];
  let message = '';
  const statusCode = 400;
  if (error.code == 'P2025') {
    message = error.message || 'Record Not fount';
    errors = [
      {
        path: '',
        message,
      },
    ];
  } else if (error.code == 'P2003') {
    if (error.message.includes('delete()` invocation:')) {
      message = 'delete failed';
      errors = [
        {
          path: '',
          message,
        },
      ];
    }
  }
  return {
    statusCode,
    message: 'Cast Error',
    errorMessages: errors,
  };
};

export default handleClientError;
