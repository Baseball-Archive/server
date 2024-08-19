import express from "express";
import { join, getUser } from "../controller/usersController";

const router = express.Router();

router.use(express.json());

router.get("/", getUser);
router.post("/join", join);

export default router;
