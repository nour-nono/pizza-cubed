import { User } from '@/models/User';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { mongoConnect } from '@/app/lib/mongoClient';

export async function POST(request: Request) {
  const body = await request.json();
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  const { image } = body;

  await mongoConnect();
  const res = await User.updateOne({ email }, { image });

  return Response.json({ message: 'Image uploaded successfully' });
}
