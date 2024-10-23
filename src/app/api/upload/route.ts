import mongoose from 'mongoose';
import { User } from '@/models/User';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function ConnectToDB() {
  if (!process.env.MONGODB_URI || !process.env.MONGODB_DB) {
    throw new Error('Missing env variables: "MONGODB_URI" Or "MONGODB_DB"');
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.MONGODB_DB,
    });
    console.log('Successfully connected to the database');
  } catch (error) {
    console.error('Error connecting to the database', error);
  }
}

export async function POST(request: Request) {
  const body = await request.json();

  const _id = body?._id;

  let email;
  if (!_id) {
    const session = await getServerSession(authOptions);
    email = session?.user?.email;
  } else {
    email = await User.findOne({ _id });
    email = email?.email;
  }
  const { image } = body;

  await ConnectToDB();
  const res = await User.updateOne({ email }, { image });

  return Response.json({ message: 'Image uploaded successfully' });
}
