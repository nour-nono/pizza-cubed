import { isAdmin, getUserEmail } from '@/app/api/auth/[...nextauth]/route';
import { User } from '@/app/models/User';
import { UserInfo } from '@/app/models/UserInfo';
import mongoose from 'mongoose';
import { z } from 'zod';

const POSTAL_CODE_REGEX = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
const PHONE_NUMBER_REGEX =
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/;

export async function PUT(req: Request) {
  const body = await req.json();
  const userInfoSchema = z
    .object({
      streetAddress: z
        .string({ message: 'Street address should be a string' })
        .min(1, 'Street address is too short')
        .optional(),
      postalCode: z
        .string({ message: 'Postal code should be a string' })
        .regex(POSTAL_CODE_REGEX, 'Postal code is invalid')
        .optional(),
      city: z
        .string({ message: 'City should be a string' })
        .min(1, 'City is too short')
        .optional(),
      phone: z
        .string({ message: 'Phone number should be a string' })
        .regex(PHONE_NUMBER_REGEX, 'Phone number is invalid')
        .optional(),
      admin: z.boolean().optional(),
    })
    .transform(async (data) => {
      if (!(await isAdmin())) {
        const { admin, ...rest } = data;
        return rest;
      }
      return data;
    });
  const validationResult = await userInfoSchema.safeParseAsync(body);

  if (!validationResult.success) {
    return Response.json({ error: validationResult.error.issues });
  }

  const email = await getUserEmail();

  if (!process.env.MONGODB_URI) {
    throw new Error('Missing env variable: "MONGODB_URI"');
  }
  mongoose.connect(process.env.MONGODB_URI);
  const userInfoDoc = await UserInfo.updateOne(
    { email },
    validationResult.data,
    {
      upsert: true,
    },
  );
  return Response.json(userInfoDoc);
}

export async function GET() {
  const email = await getUserEmail();

  if (!email) {
    return Response.json({ error: [{ message: 'User email not found' }] });
  }

  if (!process.env.MONGODB_URI) {
    throw new Error('Missing env variable: "MONGODB_URI"');
  }
  mongoose.connect(process.env.MONGODB_URI);
  const user = await User.aggregate([
    {
      $match: { email },
    },
    {
      $lookup: {
        from: 'userinfos',
        localField: 'email',
        foreignField: 'email',
        as: 'userInfos',
      },
    },
    {
      $unwind: { path: '$userInfos', preserveNullAndEmptyArrays: true },
    },
    {
      $project: {
        password: 0,
        'userInfos.email': 0,
        'userInfos.admin': 0,
      },
    },
  ]);

  return Response.json(user.length ? user[0] : []);
}
