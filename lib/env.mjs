import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  clientPrefix: 'NEXT_PUBLIC_',
  server: {
    NODE_ENV: z
      .enum(['development', 'test', 'production'])
      .default('development'),
    DATABASE_URL: z.string().min(1),

    NEXTAUTH_SECRET:
      process.env.NODE_ENV === 'production'
        ? z.string().min(1)
        : z.string().min(1).optional(),
    // NEXTAUTH_URL: z.preprocess(
    //   // This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
    //   // Since NextAuth.js automatically uses the VERCEL_URL if present.
    //   str => process.env.VERCEL_URL ?? str,
    //   // VERCEL_URL doesn't include `https` so it cant be validated as a URL
    //   process.env.VERCEL_URL ? z.string().min(1) : z.string().url()
    // ),
    // GOOGLE_CLIENT_ID: z.string().min(1),
    // GOOGLE_CLIENT_SECRET: z.string().min(1),
    GITHUB_CLIENT_ID: z.string().min(1),
    GITHUB_CLIENT_SECRET: z.string().min(1),
    RESEND_API_KEY: z.string().min(1),
    // STRIPE_SECRET_KEY: z.string().min(1),
    // STRIPE_WEBHOOK_SECRET: z.string().min(1),
    TIPTAP_COLLAB_SECRET: z.string().min(1).default('secret'),
    WEB_DEPLOYMENT_URL: z.string().min(1).default('http://localhost:3000'),
    SOCKET_BASE_URL: z.string().min(1).default('http://localhost:4000'),
  },
  client: {
    // NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().min(1),
    // NEXT_PUBLIC_STRIPE_PRO_PRICE_ID: z.string().min(1),
    // NEXT_PUBLIC_STRIPE_MAX_PRICE_ID: z.string().min(1),
    // NEXT_PUBLIC_STRIPE_ULTRA_PRICE_ID: z.string().min(1), // NEXT_PUBLIC_PUBLISHABLE_KEY: z.string().min(1),
    NEXT_PUBLIC_SOCKET_BASE_URL: z
      .string()
      .min(1)
      .default('ws://127.0.0.1:4000'),
    NEXT_PUBLIC_HOCUSPOCUS_PATH: z.string().min(1).default('/hocuspocus'),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_SOCKET_BASE_URL: process.env.NEXT_PUBLIC_SOCKET_BASE_URL,
  },
});
