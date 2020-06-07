import mongoose, { mongo } from 'mongoose';
import { Password } from '../services/passwords';

// An interface that describes the properties
// that are requried to create a new User
// Used to create the build function properly
interface UserAttrs {
  email: string;
  password: string;
}

// An interface that describes the properties
// that a User Model has
// Used to encapsulate the build function into the UserModel class
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties
// that a User Document has
// Solve issue 2
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Middleware implemented in mongoose
// Any time we attempt to save a document, we're going to execute this function
// Mongoose as express doesn't have so much to async await syntax
// Because of that, we need the done statement
// Another point it's we have to use function instead of the arrow function,
// to avoid the context be overwritten and would be the context of this file
// Using the function syntax we have access to the User that we are trying
// to persist on the database on the key 'this'
userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};
// Generics in TypeScript
// Essentially allow us to customize the types being used inside of
// a function, a class or an interface
const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

// Now if a we try create a User with attributes that aren't in the interface
// TypeScript is going to complaint
// This is because mongoose and TS doesn't colaborate that well

export { User };
