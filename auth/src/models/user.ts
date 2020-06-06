import mongoose, { mongo } from 'mongoose';

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
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

// Now if a we try create a User with attributes that aren't in the interface
// TypeScript is going to complaint
// This is because mongoose and TS doesn't colaborate that well

export { User };
