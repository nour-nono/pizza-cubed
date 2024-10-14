
import { models, model, Model, Schema, Document } from "mongoose";

/**
 * Interface representing a UserInfo document
 */
interface IUserInfo extends Document {
  email: string;
  streetAddress?: string;
  postalCode?: string;
  city?: string;
  phone?: string;
  admin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Mongoose schema for the UserInfo model
 */
const UserInfoSchema = new Schema<IUserInfo>(
  {
    email: { type: String, required: true, unique: true },
    streetAddress: { type: String },
    postalCode: { type: String },
    city: { type: String },
    phone: { type: String },
    admin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

/**
 * Mongoose model for UserInfo
 */
export const UserInfo: Model<IUserInfo> = models.UserInfo || model<IUserInfo>("UserInfo", UserInfoSchema);
