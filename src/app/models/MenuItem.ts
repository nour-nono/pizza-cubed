import mongoose, { model, models, Model, Schema, Document} from "mongoose";

/**
 * Interface representing an extra price for sizes or ingredients
 */
interface IExtraPrice {
  name: string;
  price: number;
}

/**
 * Interface representing a MenuItem document
 */
interface IMenuItem extends Document {
  name: string;
  description: string;
  category: mongoose.Types.ObjectId;
  basePrice: number;
  sizes?: IExtraPrice[];
  extraIngredientPrices?: IExtraPrice[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Schema for extra prices (sizes and ingredients)
 */
const ExtraPriceSchema = new Schema<IExtraPrice>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

/**
 * Mongoose schema for the MenuItem model
 */
const MenuItemSchema = new Schema<IMenuItem>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    basePrice: { type: Number, required: true },
    sizes: { type: [ExtraPriceSchema], default: undefined },
    extraIngredientPrices: { type: [ExtraPriceSchema], default: undefined },
  },
  { timestamps: true }
);

/**
 * Mongoose model for MenuItem
 */
export const MenuItem: Model<IMenuItem> = models.MenuItem || model<IMenuItem>("MenuItem", MenuItemSchema);
