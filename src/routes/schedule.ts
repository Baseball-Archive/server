import { Router } from "express";
import { saveSchedules } from "../controllers/scheduleController";

const router = Router();

router.post("/save", saveSchedules);

export default router;
