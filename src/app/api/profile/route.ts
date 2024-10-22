import { isAdmin, getUserEmail } from '@/app/api/auth/[...nextauth]/route';
import { getUsers } from '@/app/lib/userInfos';
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

  if (!process.env.MONGODB_URI || !process.env.MONGODB_DB) {
    throw new Error('Missing env variables: "MONGODB_URI" Or "MONGODB_DB"');
  }
  await mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.MONGODB_DB,
  });
  const result = await UserInfo.updateOne({ email }, validationResult.data, {
    upsert: true,
  });

  if (!result.matchedCount && !result.upsertedCount) {
    return Response.json(
      {
        error: [
          {
            message: 'User not found',
          },
        ],
      },
      { status: 404 },
    );
  }
  return Response.json({ message: 'User infos has been updated successfully' });
}

export async function GET() {
  const email = await getUserEmail();

  if (!email) {
    return Response.json({ error: [{ message: 'User email not found' }] });
  }

  if (!process.env.MONGODB_URI || !process.env.MONGODB_DB) {
    throw new Error('Missing env variables: "MONGODB_URI" Or "MONGODB_DB"');
  }
  await mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.MONGODB_DB,
  });
  const user = await getUsers({ email });
  return Response.json(user);
}
