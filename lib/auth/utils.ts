import prisma from '@/lib/db/index';
import { env } from '@/lib/env.mjs';
import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import Nodemailer from 'next-auth/providers/nodemailer';

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  trustHost: true,
  adapter: PrismaAdapter(prisma),
  pages: {
    verifyRequest: '/auth/verify-request',
  },
  providers: [
    Nodemailer({
      server: {
        host: env.SMTP_HOST,
        port: env.SMTP_PORT,
        auth: {
          user: env.SMTP_USER,
          pass: env.SMTP_PASSWORD,
        },
      },
      from: env.SMTP_USER,
      ...(env.NODE_ENV !== 'production' && {
        sendVerificationRequest({ identifier: email, url }) {
          console.info('Sending email to:', email, url);
        },
      }),
    }),
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
});
