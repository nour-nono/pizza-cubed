import { isAdmin, getUserEmail } from '@/app/api/auth/[...nextauth]/route';
import { mongoConnect } from '@/app/lib/mongoClient';
import { getUsers } from '@/app/lib/userInfos';
import { User } from '@/models/User';
import { UserInfo } from '@/models/UserInfo';
import { error } from 'console';
import mongoose from 'mongoose';
import { z } from 'zod';

export async function GET() {
  await mongoConnect();
  console.log(await isAdmin());

  if (await isAdmin()) {
    const list_users = await getUsers();
    if (!list_users) return Response.json(error('Empty users list'));
    return Response.json(list_users);
  } else {
    return Response.json(
      { error: [{ message: 'Access denied' }] },
      { status: 403 },
    );
  }
}

export async function PUT(req: Request) {
  const url = new URL(req.url);
  const _id = url.searchParams.get('_id');

  const updateUserSchema = z.object({
    _id: z.string().refine((val) => {
      return mongoose.Types.ObjectId.isValid(val);
    }, 'User id is incorrect'),
  });
  const validationResult = updateUserSchema.safeParse({ _id });

  if (!validationResult.success) {
    return Response.json({ error: validationResult.error.issues });
  }

  await User.updateOne({ _id }, { admin: true });
  return Response.json({ message: 'User role has been updated successfully' });
}
