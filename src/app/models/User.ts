import { model, models, Schema } from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String },
}, { timestamps: true });

UserSchema.post("validate", function (user) {
  const passwordBeforeHash = user.password as string;
  const salt = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(passwordBeforeHash, salt);
});

export const User = models?.User || model("user", UserSchema);