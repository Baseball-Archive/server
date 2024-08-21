import express, { Request, Response } from "express";
import { s3, upload } from "../../config/s3Uploader";
import { PutObjectCommand, PutObjectCommandInput } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

// 파일 업로드 라우트
router.post("/upload", upload.single("profileImage"), async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).send("파일이 업로드되지 않았습니다.");
  }

  try {
    const fileContent = req.file.buffer;
    const fileName = `profile-images/${uuidv4()}-${req.file.originalname}`;
    const uploadParams: PutObjectCommandInput = {
      Bucket: process.env.S3_BUCKET_NAME!,
      Key: fileName,
      Body: fileContent,
      ContentType: req.file.mimetype,
    };

    const command = new PutObjectCommand(uploadParams);
    await s3.send(command);

    // 파일 URL 생성
    const fileUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
    res.json({ fileUrl });
  } catch (error) {
    console.error(error);
    res.status(500).send("파일 업로드 중 오류가 발생했습니다.");
  }
});

export default router;
