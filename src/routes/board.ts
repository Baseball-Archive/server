import { Router } from "express";
import { authenticateFirebaseToken } from "../middlewares/auth";
import { addPost, updatePost, deletePost, findAllPost, findPost } from "../controllers/boardController";

const router = Router();

router.post("/", authenticateFirebaseToken, addPost);
router.put("/:boardId", authenticateFirebaseToken, updatePost);
router.delete("/:boardId", authenticateFirebaseToken, deletePost);
router.get("/", authenticateFirebaseToken, findAllPost);
router.get("/:boardId", authenticateFirebaseToken, findPost);

export default router;
