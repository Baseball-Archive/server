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
const storage = multer.memoryStorage(); // 파일을 메모리에 저장합니다.

const upload = multer({
  storage,
  fileFilter: (req: Request, file, cb: FileFilterCallback) => {
    // 파일 필터링 로직을 추가할 수 있습니다.
    cb(null, true);
  },
});

export { upload, s3 };
