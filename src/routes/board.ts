import { Router } from "express";
import { authenticateFirebaseToken } from "../middlewares/auth";
import { addPost, updatePost, deletePost, viewPostList, viewPostDetail } from "../controllers/boardController";

const router = Router();

router.post("/", authenticateFirebaseToken, addPost);
router.put("/:boardId", authenticateFirebaseToken, updatePost);
router.delete("/:boardId", authenticateFirebaseToken, deletePost);
router.get("/", authenticateFirebaseToken, viewPostList);
router.get("/:boardId", authenticateFirebaseToken, viewPostDetail);

export default router;
