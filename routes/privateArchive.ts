import { Router } from "express";
import { authenticateFirebaseToken } from "../middleware/auth";
import * as privateArchiveController from "../controller/privateArchiveController";

const router = Router();

router.post("/", authenticateFirebaseToken, privateArchiveController.createPrivateArchive);
router.get("/", privateArchiveController.getPrivateArchives);
export default router;
