import express, { Request, Response, response } from 'express';
import { body, validationResult } from 'express-validator';

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
    const erros = validationResult(req);

    if (!erros.isEmpty()) {
      return res.status(400).send(erros.array());
    }

    const { email, password } = req.body;

    console.log('Creating a user...');

    res.send({});
  }
);

router.get('/api/users/signup', (req: Request, res: Response) => {
  res.send('dale');
});

export { router as signupRouter };
