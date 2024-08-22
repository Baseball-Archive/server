import { Router } from "express";
import { authenticateFirebaseToken } from "../middlewares/auth";
import { writePost, updatePost, deletePost, viewPostList, viewPostDetail } from "../controllers/boardController";

const router = Router();

router.post("/", authenticateFirebaseToken, writePost);
router.put("/:boardId", authenticateFirebaseToken, updatePost);
router.delete("/:boardId", authenticateFirebaseToken, deletePost);
router.get("/", authenticateFirebaseToken, viewPostList);
router.get("/:boardId", authenticateFirebaseToken, viewPostDetail);

export default router;
