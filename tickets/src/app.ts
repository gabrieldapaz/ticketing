// app.ts just setup the express application

import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError } from '@dpztickets/common';

const app = express();
// Ensure that express is aware that is behind a proxy that's nginx
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false, // Don't encrypt
    secure: process.env.NODE_ENV !== 'test', // HTTPS
  })
);

// If didn't have the express-async-errors this wouldn't send the request
// because would need the next
// Make sure that express waits or essentially does in await statement on this function
app.get('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
