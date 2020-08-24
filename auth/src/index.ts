// Start the express application

import mongoose from 'mongoose';

import { app } from './app';

const start = async () => {
  console.log('Starting up');
  // This function will wait for the connection, if don't connect, will throw an error
  // Instead of using localhost, we use the name of the clusterIP to access mongo db Pod

  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
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
