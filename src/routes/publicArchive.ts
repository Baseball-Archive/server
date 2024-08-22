import { Router } from "express";
import {
    viewPost,
    viewPostDetail
} from "../controllers/publicArchiveController";

const router = Router();

router.get("/", viewPost);
router.get("/", viewPostDetail);

export default router;