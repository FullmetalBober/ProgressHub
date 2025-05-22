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
    GITHUB_CLIENT_ID: z.string().min(1),
    GITHUB_CLIENT_SECRET: z.string().min(1),
    TIPTAP_COLLAB_SECRET: z.string().min(1).default('secret'),
    WEB_DEPLOYMENT_URL: z.string().min(1).default('http://localhost:3000'),
    SOCKET_BASE_URL: z.string().min(1).default('http://localhost:4000'),

    SMTP_HOST: z.string().min(1),
    SMTP_PORT: z
      .string()
      .default('465')
      .transform(v => parseInt(v)),
    SMTP_USER: z.string().min(1),
    SMTP_PASSWORD: z.string().min(1),
    UPLOADTHING_TOKEN: z.string().min(1),
    GITHUB_APP_ID: z.string().min(1),
    GITHUB_PRIVATE_KEY: z
      .string()
      .min(1)
      .transform(v => {
        return Buffer.from(v, 'base64').toString('utf8');
      }),
    GITHUB_WEBHOOK_SECRET: z.string().min(1),
    GITHUB_WEBHOOK_PROXY_URL: z.string().min(1).optional(),
    ENABLE_CRON_JOBS: z
      .enum(['true', 'false'])
      .default('true')
      .transform(v => v === 'true'),
  },
  client: {
    NEXT_PUBLIC_SOCKET_BASE_URL: z
      .string()
      .min(1)
      .default('ws://127.0.0.1:4000'),
    NEXT_PUBLIC_HOCUSPOCUS_PATH: z.string().min(1).default('/hocuspocus'),
    NEXT_PUBLIC_GITHUB_APP_NAME: z.string().min(1).default('progresshubapp'),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    TIPTAP_COLLAB_SECRET: process.env.TIPTAP_COLLAB_SECRET,
    WEB_DEPLOYMENT_URL: process.env.WEB_DEPLOYMENT_URL,
    SOCKET_BASE_URL: process.env.SOCKET_BASE_URL,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
    NEXT_PUBLIC_SOCKET_BASE_URL: process.env.NEXT_PUBLIC_SOCKET_BASE_URL,
    NEXT_PUBLIC_HOCUSPOCUS_PATH: process.env.NEXT_PUBLIC_HOCUSPOCUS_PATH,
    UPLOADTHING_TOKEN: process.env.UPLOADTHING_TOKEN,
    NEXT_PUBLIC_GITHUB_APP_NAME: process.env.NEXT_PUBLIC_GITHUB_APP_NAME,
    GITHUB_APP_ID: process.env.GITHUB_APP_ID,
    GITHUB_PRIVATE_KEY: process.env.GITHUB_PRIVATE_KEY,
    GITHUB_WEBHOOK_SECRET: process.env.GITHUB_WEBHOOK_SECRET,
    GITHUB_WEBHOOK_PROXY_URL: process.env.GITHUB_WEBHOOK_PROXY_URL,
    ENABLE_CRON_JOBS: process.env.ENABLE_CRON_JOBS,
  },
});
