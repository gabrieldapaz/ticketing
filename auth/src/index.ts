import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();
// Ensure that express is aware that is behind a proxy that's nginx
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false, // Don't encrypt
    secure: true, // HTTPS
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

// If didn't have the express-async-errors this wouldn't send the request
// because would need the next
// Make sure that express waits or essentially does in await statement on this function
app.get('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  // This function will wait for the connection, if don't connect, will throw an error
  // Instead of using localhost, we use the name of the clusterIP to access mongo db Pod

  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY mus be defined');
  }

  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.log(err);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000');
  });
};

start();
