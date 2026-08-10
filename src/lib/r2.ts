import { randomUUID } from "node:crypto";

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

import { required } from "@/lib/env";
import { sanitizeResumeFileName } from "@/lib/resume";

function r2Endpoint(): string {
  const explicit = process.env.S3_ENDPOINT?.trim().replace(/\/$/, "");
  if (explicit) return explicit;

  const accountId = required("R2_ACCOUNT_ID", process.env.R2_ACCOUNT_ID);
  const jurisdiction = (process.env.R2_JURISDICTION ?? "").trim().toLowerCase();
  if (jurisdiction === "eu") {
    return `https://${accountId}.eu.r2.cloudflarestorage.com`;
  }
  return `https://${accountId}.r2.cloudflarestorage.com`;
}

function getR2Client() {
  const accessKeyId = process.env.S3_ACCESS_KEY_ID?.trim();
  const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY?.trim();
  if (!accessKeyId || !secretAccessKey) {
    throw new Error(
      "R2 is not configured. Set S3_ACCESS_KEY_ID and S3_SECRET_ACCESS_KEY, then restart the server.",
    );
  }

  return new S3Client({
    region: process.env.S3_REGION?.trim() || "auto",
    endpoint: r2Endpoint(),
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
    forcePathStyle: true,
  });
}

function getBucket() {
  return required("S3_BUCKET", process.env.S3_BUCKET);
}

export async function uploadResumeToR2(input: {
  file: File;
  jobOpeningId: string;
}): Promise<{
  storageKey: string;
  fileName: string;
  contentType: string;
}> {
  const fileName = sanitizeResumeFileName(input.file.name);
  const contentType =
    input.file.type ||
    (fileName.toLowerCase().endsWith(".pdf")
      ? "application/pdf"
      : "application/octet-stream");
  const storageKey = `careers/resumes/${input.jobOpeningId}/${randomUUID()}-${fileName}`;
  const body = Buffer.from(await input.file.arrayBuffer());

  await getR2Client().send(
    new PutObjectCommand({
      Bucket: getBucket(),
      Key: storageKey,
      Body: body,
      ContentType: contentType,
      ContentLength: body.length,
      Metadata: {
        "job-opening-id": input.jobOpeningId,
        "original-name": fileName.slice(0, 100),
      },
    }),
  );

  return { storageKey, fileName, contentType };
}
