import { Router } from "express";
import { saveSchedules, getSchedules } from "../controllers/scheduleController";

const router = Router();

router.post("/save", saveSchedules);
router.get("/:date", getSchedules);

export default router;
