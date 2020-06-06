import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../erros/request-validation-error';
import { DatabaseConnectionError } from '../erros/database-connection-error';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 charcters'),
  ],
  (req: Request, res: Response) => {
    // Append information about possibles erros on the request
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // The string passed into Error will be attached to 'message' property
      throw new RequestValidationError(errors.array())
    }

    const { email, password } = req.body;

    console.log('Creating a user...');
    throw new DatabaseConnectionError();

    res.send({});
  }
);

export { router as signupRouter };
