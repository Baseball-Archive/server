import { Router } from "express";
import { authenticateFirebaseToken } from "../middlewares/auth";
import {
  addCommentToArchive,
  updateCommentFromArchive,
  deleteCommentFromArchive,
  findAllCommentFromArchive,
  addCommentToBoard,
  updateCommentFromBoard,
  deleteCommentFromBoard,
  findAllCommentFromBoard,
} from "../controllers/commentsController";

const router = Router();

router.post("/archive/:archiveId", authenticateFirebaseToken, addCommentToArchive);
router.put("/archive/:archiveId", authenticateFirebaseToken, updateCommentFromArchive);
router.delete("/archive/:archiveId", authenticateFirebaseToken, deleteCommentFromArchive);
router.get("/archive/:archiveId", authenticateFirebaseToken, findAllCommentFromArchive);
router.post("/board/:boardId", authenticateFirebaseToken, addCommentToBoard);
router.put("/board/:boardId", authenticateFirebaseToken, updateCommentFromBoard);
router.delete("/board/:boardId", authenticateFirebaseToken, deleteCommentFromBoard);
router.get("/board/:boardId", authenticateFirebaseToken, findAllCommentFromBoard);

export default router;
