import { Router } from "express";
import { saveRanking } from "../controllers/rankingController";

const router = Router();

router.post("/save", saveRanking);

export default router;
