import { isAdmin, getUserEmail } from '@/app/api/auth/[...nextauth]/route';
import { getUsers } from '@/app/lib/userInfos';
import { User } from '@/app/models/User';
import { UserInfo } from '@/app/models/UserInfo';
import { error } from 'console';
import mongoose from 'mongoose';
import { z } from 'zod';

export async function GET() {
  if (!process.env.MONGODB_URI || !process.env.MONGODB_DB) {
    throw new Error('Missing env variables: "MONGODB_URI" Or "MONGODB_DB"');
  }
  await mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.MONGODB_DB,
  });
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
