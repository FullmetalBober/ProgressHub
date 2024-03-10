import { prisma } from '@/lib/db/index';
import { env } from '@/lib/env.mjs';
import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { redirect } from 'next/navigation';

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
  ],
});

export const checkAuth = async () => {
  const session = await auth();
  if (!session) redirect('/api/auth/signin');
};
