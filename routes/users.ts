import express from "express";
import { join, getUser, updateUser } from "../controller/usersController";

const router = express.Router();

router.use(express.json());

router.get("/", getUser);
router.put("/", updateUser);

router.post("/join", join);

export default router;
