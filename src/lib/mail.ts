import nodemailer from "nodemailer";
import type { Attachment } from "nodemailer/lib/mailer";

function smtpConfig() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;

  if (!host || !user || !pass || Number.isNaN(port)) {
    return null;
  }

  // Implicit TLS only on 465. Ports 587/2525 use STARTTLS (secure: false).
  // Mis-setting SMTP_SECURE=true on 2525 causes: wrong version number / ESOCKET.
  const secureEnv = process.env.SMTP_SECURE;
  const secure =
    secureEnv === "true" || secureEnv === "false"
      ? secureEnv === "true"
      : port === 465;

  return {
    host,
    port,
    secure,
    auth: { user, pass },
  };
}

export function getMailFrom(): string {
  return (
    process.env.SMTP_FROM_DEFAULT ??
    process.env.SMTP_FROM_NOREPLY ??
    "noreply@curnext.app"
  );
}

export function getMailReplyTo(): string | undefined {
  const replyTo = process.env.SMTP_FROM_NOREPLY;
  const from = getMailFrom();
  if (!replyTo || replyTo === from) return undefined;
  return replyTo;
}

export function createMailTransport() {
  const config = smtpConfig();
  if (!config) return null;
  return nodemailer.createTransport(config);
}

export async function sendMail(options: {
  to: string;
  subject: string;
  text: string;
  html: string;
  attachments?: Attachment[];
}): Promise<{ sent: boolean; error?: string }> {
  const transport = createMailTransport();
  if (!transport) {
    return {
      sent: false,
      error: "SMTP is not configured",
    };
  }

  try {
    await transport.sendMail({
      from: `CurNext <${getMailFrom()}>`,
      replyTo: getMailReplyTo(),
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
      attachments: options.attachments,
    });
    return { sent: true };
  } catch (error) {
    console.error("sendMail error", error);
    return {
      sent: false,
      error: error instanceof Error ? error.message : "Failed to send email",
    };
  }
}
