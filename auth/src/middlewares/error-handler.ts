import { Request, Response, NextFunction } from 'express';
import { RequestValidationError } from '../erros/request-validation-error';
import { DatabaseConnectionError } from '../erros/database-connection-error';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof RequestValidationError) {
    // Format all error messagem to one pattern.
    const formattedErrors = err.errors.map((error) => {
      return { message: error.msg, field: error.param };
    });
    // Using return to not execute the rest of the code
    return res.status(400).send({ errors: formattedErrors });
  }

  if (err instanceof DatabaseConnectionError) {
    return res.status(500).send({ errors: [{ message: err.reason }] });
  }

  res.status(400).send({
    errors: [{ message: 'Something went wrong' }],
  });
};
