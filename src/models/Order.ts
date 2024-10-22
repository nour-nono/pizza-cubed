import { models, model, Model, Schema, Document } from 'mongoose';

// Define an interface for the Order document
interface IOrder extends Document {
  userEmail: string;
  phone: string;
  streetAddress: string;
  postalCode: string;
  city: string;
  cartProducts: Record<string, any>; // Consider defining a more specific type for cartProducts
  paid: boolean;
  canceled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Define the Order schema
const OrderSchema = new Schema<IOrder>(
  {
    userEmail: { type: String, required: true },
    phone: { type: String, required: true },
    streetAddress: { type: String, required: true },
    postalCode: { type: String, required: true },
    city: { type: String, required: true },
    cartProducts: { type: Object, required: true },
    paid: { type: Boolean, default: false },
    canceled: { type: Boolean, default: false },
  },
  { timestamps: true },
);

// Create and export the Order model
export const Order: Model<IOrder> =
  models?.Order || model<IOrder>('Order', OrderSchema);
