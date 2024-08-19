import express from "express";
import { join, getUser, editUser } from "../controller/usersController";

const router = express.Router();

router.use(express.json());

router.get("/", getUser);
router.put("/", editUser);

router.post("/join", join);

export default router;
