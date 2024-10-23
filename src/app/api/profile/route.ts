import { isAdmin, getUserEmail } from '@/app/api/auth/[...nextauth]/route';
import { getUsers } from '@/app/lib/userInfos';
import { User } from '@/models/User';
import { UserInfo } from '@/models/UserInfo';
import mongoose from 'mongoose';
import { z } from 'zod';

const POSTAL_CODE_REGEX = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
const PHONE_NUMBER_REGEX =
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/;

export async function PUT(req: Request) {
  const body = await req.json();
  const userInfoSchema = z
    .object({
      name: z
        .string({ message: 'Name should be a string' })
        .min(1, 'Name is too short')
        .optional(),
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
  if (body?._id && !(await isAdmin())) {
    return Response.json(
      {
        error: [
          {
            message: 'User not found',
          },
        ],
      },
    );
  }
  let email;
  if (!body?._id) {
    email = await getUserEmail();
  } else {
    email = await User.findOne({ _id: body._id });
    email = email?.email;
  }

  if (!process.env.MONGODB_URI || !process.env.MONGODB_DB) {
    throw new Error('Missing env variables: "MONGODB_URI" Or "MONGODB_DB"');
  }
  await mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.MONGODB_DB,
  });
  await User.updateOne({ email }, { name: validationResult.data.name });
  const result = await UserInfo.findOneAndUpdate(
    { email },
    validationResult.data,
    {
      upsert: true,
    },
  );

  if (!result) {
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

export async function GET(req: Request) {
  const url = new URL(req.url);
  const _id = url.searchParams.get('_id') as string | null;
  let email;
  if (!_id) {
    email = await getUserEmail();
  } else {
    email = await User.findOne({ _id });
    email = email?.email;
  }
  if (!email && !_id) {
    return Response.json({ error: [{ message: 'User email not found' }] });
  }

  if (!process.env.MONGODB_URI || !process.env.MONGODB_DB) {
    throw new Error('Missing env variables: "MONGODB_URI" Or "MONGODB_DB"');
  }
  await mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.MONGODB_DB,
  });
  let user: (typeof User)[] | null = null;
  if (_id) {
    user = await getUsers({ email });
  } else {
    user = await getUsers({ email });
  }
  return Response.json(user);
}
