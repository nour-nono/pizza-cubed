import { model, Model, Schema, Document, models } from 'mongoose';
import bcrypt from 'bcrypt';

/**
 * Interface representing a User document
 */
interface IUser extends Document {
  name?: string;
  email: string;
  password: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Mongoose schema for the User model
 */
const UserSchema = new Schema<IUser>(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    image: { type: String },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

// /**
//  * Middleware to hash the password before saving
//  */
// UserSchema.pre<IUser>('save', async function (next) {
//   if (!this.isModified('password')) return next();

//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (error: any) {
//     next(error);
//   }
// });

// /**
//  * Method to compare passwords
//  */
// UserSchema.methods.comparePassword = async function (
//   candidatePassword: string,
// ): Promise<boolean> {
//   return bcrypt.compare(candidatePassword, this.password);
// };

/**
 * Mongoose model for User
 */
export const User: Model<IUser> =
  models.User || model<IUser>('User', UserSchema);
