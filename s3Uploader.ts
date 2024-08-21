import { S3Client } from "@aws-sdk/client-s3";
import multer, { FileFilterCallback } from "multer";
import { Request } from "express";

// AWS S3 설정
const s3 = new S3Client({
  region: process.env.AWS_REGION || "us-west-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

// Multer 설정
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 파일 크기를 5MB로 제한합니다.
  },
  fileFilter: (req: Request, file, cb: FileFilterCallback) => {
    cb(null, true);
  },
});

export { upload, s3 };
