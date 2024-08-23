import { Router } from "express";
import { authenticateFirebaseToken } from "../middlewares/auth";
import { findAllArchive, findArchive } from "../controllers/publicArchiveController";

const router = Router();

router.get("/", findAllArchive);
router.get("/:archiveId", findArchive);

export default router;
