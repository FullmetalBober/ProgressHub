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
  console.log({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASSWORD,
    },
  });
  console.log({
    from: `ProgressHub <${env.SMTP_USER}>`,
    to,
    subject,
  });
  console.log(await render(react));
  const mail = {
    from: `ProgressHub <${env.SMTP_USER}>`,
    to,
    subject,
    html: await render(react),
  };
  if (env.NODE_ENV !== 'production') console.info(mail);
  else return transporter.sendMail(mail);
};
