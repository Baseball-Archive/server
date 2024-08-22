import { Router } from "express";
import {
    addComment,
    modifyComment,
    deleteComment
} from "../controllers/commentsController";

const router = Router();

router.post("/", addComment);
router.put("/", modifyComment);
router.delete("/", deleteComment);

export default router;