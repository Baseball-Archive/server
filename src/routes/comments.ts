import { Router } from "express";
import { authenticateFirebaseToken } from "../middlewares/auth";
import {
  addCommentToArchive,
  updateCommentFromArchive,
  deleteCommentFromArchive,
  addCommentToBoard,
  updateCommentFromBoard,
  deleteCommentFromBoard,
} from "../controllers/commentsController";

const router = Router();

router.post("/archive/:archiveId", authenticateFirebaseToken, addCommentToArchive);
router.put("/archive/:archiveId", authenticateFirebaseToken, updateCommentFromArchive);
router.delete("/archive/:archiveId", authenticateFirebaseToken, deleteCommentFromArchive);
router.post("/board/:boardId", authenticateFirebaseToken, addCommentToBoard);
router.put("/board/:boardId", authenticateFirebaseToken, updateCommentFromBoard);
router.delete("/board/:boardId", authenticateFirebaseToken, deleteCommentFromBoard);

export default router;
