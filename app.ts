import express, { Application } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import usersRouter from "./routes/users";
import uploadRouter from "./routes/awsUpload";

dotenv.config();
const app: Application = express();

app.use(cookieParser());
app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

// 라우터 설정
app.use("/users", usersRouter);
app.use("/", uploadRouter);
