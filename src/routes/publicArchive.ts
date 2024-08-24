import { Router } from "express";
import { authenticateFirebaseToken } from "../middlewares/auth";
import { findAllArchive, findArchive } from "../controllers/publicArchiveController";

const router = Router();

router.get("/", authenticateFirebaseToken, findAllArchive);
router.get("/:archiveId", authenticateFirebaseToken, findArchive);

export default router;
