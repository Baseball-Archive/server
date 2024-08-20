import { Router } from "express";
import { authenticateFirebaseToken } from "../middleware/auth";
import * as privateArchiveController from "../controller/privateArchiveController";

const router = Router();

router.post("/", authenticateFirebaseToken, privateArchiveController.createPrivateArchive);
router.get("/", authenticateFirebaseToken, privateArchiveController.getPrivateArchives);
router.put("/:archiveId", authenticateFirebaseToken, privateArchiveController.updatePrivateArchive);
router.delete("/:archiveId", authenticateFirebaseToken, privateArchiveController.deletePrivateArchive);

export default router;
