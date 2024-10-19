import mongoose from 'mongoose';
import { User } from '@/app/models/User';

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
  const { email, imageUrl } = body;
  // console.log(email, imageUrl);
  await ConnectToDB();
  // const res = await User.findByIdAndUpdate(
  //   { email },
  //   { imageUrl },
  //   { upsert: true },
  // );
  // console.log(res);
  return Response.json({ message: 'Image uploaded successfully' });
}
