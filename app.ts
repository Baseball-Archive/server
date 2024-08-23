import express, { Application } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import archiveRouter from "./src/routes/privateArchive";
import publicArchiveRouter from "./src/routes/publicArchive";
import boardRouter from "./src/routes/board";
import likesRouter from "./src/routes/likes";
import commentsRouter from "./src/routes/comments";
import usersRouter from "./src/routes/users";
import uploadRouter from "./src/routes/awsUpload";

dotenv.config();

const app: Application = express();

app.use(cookieParser());
app.use(express.json());

app.use("/archive", archiveRouter);
app.use("/archive/public", publicArchiveRouter);
app.use("/board", boardRouter);
app.use("/likes", likesRouter);
app.use("/comments", commentsRouter);
app.use("/users", usersRouter);
app.use("/", uploadRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
