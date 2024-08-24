import { Router } from "express";
import { saveRanking, getRanking } from "../controllers/rankingController";

const router = Router();

router.post("/save", saveRanking);
router.get("/", getRanking);

export default router;
