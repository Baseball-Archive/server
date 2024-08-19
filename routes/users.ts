import express from "express";
import { join, getUser, editUser } from "../controller/usersController";

const router = express.Router();

router.use(express.json());

router.get("/", getUser);
router.post("/join", join);
router.put("/", editUser);

export default router;
