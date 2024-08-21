import express, { Application } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import archiveRouter from "./routes/privateArchive";

dotenv.config();

const app: Application = express();

app.use(cookieParser());
app.use(express.json());

app.use("/archive", archiveRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
