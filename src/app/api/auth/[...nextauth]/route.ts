import NextAuth from 'next-auth';
import { nextAuth } from '@/app/lib/nextAuth';

const handler = NextAuth(nextAuth);

export { handler as GET, handler as POST };
