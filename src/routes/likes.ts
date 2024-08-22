import { Router } from "express";
import { authenticateFirebaseToken } from "../middlewares/auth";
import {
    addLikeToArchive,
    removeLikeFromArchive,
    addLikeToBoard,
    removeLikeFromBoard
} from "../controllers/likesController";

const router = Router();

router.post("/archive/:archiveId", authenticateFirebaseToken, addLikeToArchive);
router.delete("/archive/:archiveId", authenticateFirebaseToken, removeLikeFromArchive);
router.post("/board/:boardId", authenticateFirebaseToken, addLikeToBoard);
router.delete("/board/:boardId", authenticateFirebaseToken, removeLikeFromBoard);

export default router;