import { User } from '@/models/User';
import mongoose from 'mongoose';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { mongoConnect } from '@/app/lib/mongoClient';

export async function POST(req: Request) {
  const body = await req.json();

  const userSchema = z
    .object({
      email: z.string().email('Incorrect Email'),
      password: z.string().min(8, 'Password need to be more than 8 characters'),
      confirmPassword: z
        .string()
        .min(8, 'Confirm Password need to be more than 8 characters'),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ['confirmPassword'],
    });

  try {
    userSchema.parse(body);

    await mongoConnect();
    const { email, password } = body;
    const existedUser = await User.findOne({ email });

    if (existedUser) {
      throw {
        errors: [{ message: 'User with provided email already exists' }],
        status: 400,
      };
    }

    const salt = await bcrypt.genSalt(10);
    const Hashedpassword = await bcrypt.hash(password, salt);
    const user = new User({ email, password: Hashedpassword });
    await user.save();
    return Response.json({
      message: 'User created successfully',
    });
  } catch (error) {
    const { errors, status } = error as { errors: any; status?: number };
    return Response.json({ error: errors }, { status: status || 500 });
  }
}
