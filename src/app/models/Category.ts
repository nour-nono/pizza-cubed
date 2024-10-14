import { models, model, Model, Schema, Document } from 'mongoose';

/**
 * Interface representing a Category document
 */
interface ICategory extends Document {
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Mongoose schema for the Category model
 */
const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true },
);

/**
 * Mongoose model for the Category
 */
export const Category: Model<ICategory> =
  models.Category || model<ICategory>('Category', CategorySchema);
