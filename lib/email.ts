import { render } from '@react-email/components';
import nodemailer from 'nodemailer';
import { JSX } from 'react';
import { env } from './env.mjs';

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASSWORD,
  },
});

export const sendEmail = async (
  to: string,
  subject: string,
  react: JSX.Element
) => {
  return transporter.sendMail({
    from: `ProgressHub <${env.SMTP_USER}>`,
    to,
    subject,
    html: await render(react),
  });
};
