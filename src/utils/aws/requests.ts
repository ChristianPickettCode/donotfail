"use server";

import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

import crypto from "crypto";

const allowedFileTypes = ["application/pdf"];

const maxFileSize = 1048576 * 100; // 10 MB

const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

type SignedURLResponse = Promise<
  | { failure?: undefined; success: { url: string } }
  | { failure: string; success?: undefined }
>;

type GetSignedURLParams = {
  fileType: string;
  fileSize: number;
  checksum: string;
  slideId: string;
};

export const getSignedURL = async ({
  fileType,
  fileSize,
  checksum,
  slideId,
}: GetSignedURLParams): Promise<SignedURLResponse> => {
  if (!allowedFileTypes.includes(fileType)) {
    return { failure: "File type not allowed" };
  }

  if (fileSize > maxFileSize) {
    return { failure: "File size too large" };
  }

  const fileName = generateFileName();

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: "slides/" + slideId + "/" + fileName,
    ContentType: fileType,
    ContentLength: fileSize,
    ChecksumSHA256: checksum,
  });

  const url = await getSignedUrl(
    s3Client,
    putObjectCommand,
    { expiresIn: 60 } // 60 seconds
  );

  return { success: { url } };
};

type DeleteFileParams = {
  key: string;
};
export const deleteAWSFile = async ({ key }: DeleteFileParams) => {
  const deleteObjectCommand = new DeleteObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: key,
  });

  await s3Client.send(deleteObjectCommand);
};
