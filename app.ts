import express, { Application } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();
const app: Application = express();

app.use(cookieParser());
app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

// 라우터 임포트

// 라우터 설정
