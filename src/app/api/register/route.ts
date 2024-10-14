import { User } from "@/app/models/User";
import mongoose from "mongoose";
import { z } from "zod";

export async function POST(req: Request) {
  const body = await req.json();

  const userSchema = z
    .object({
      email: z.string().email("Incorrect Email"),
      password: z.string().min(8, "Password need to be more than 8 carachtre"),
      confirmPassword: z
        .string()
        .min(8, "Password need to be more than 8 carachtre"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    });

  try {
    userSchema.parse(body);

    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.MONGODB_DB as string,
    });

    const { email, password } = body;
    const existedUser = await User.findOne({ email });

    if (existedUser) {
      throw {
        errors: [{ message: "User with provided email already exists" }],
        status: 400,
      };
    }

    const user = new User({ email, password });
    await user.save();
    return Response.json({
      message: "User created successfully",
    });
  } catch (error) {
    console.log(">>", error);
    const { errors, status } = error as { errors: any; status?: number };
    return Response.json({ error: errors }, { status: status || 500 });
  } finally {
    mongoose.disconnect();
  }
}
