import express from "express";
import { join, getUser, updateUser, checkNickname } from "../controllers/usersController";

const router = express.Router();

router.use(express.json());

router.get("/", getUser);
router.put("/", updateUser);

router.get("/checkNickname", checkNickname);

router.post("/join", join);

export default router;
