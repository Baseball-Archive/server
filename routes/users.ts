import express from "express";
import { join } from "../controller/usersController";

const router = express.Router();

router.use(express.json());

router.post("/join", join);

export default router;
