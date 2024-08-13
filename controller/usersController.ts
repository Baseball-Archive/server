import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import pool from "../postgresql";
import crypto from "crypto";
import { joinModel } from "../model/usersModel";

const hashPassword = (password: string, salt: string) => {
  return crypto.pbkdf2Sync(password, salt, 10000, 10, "sha512").toString("base64");
};

const join = async (req: Request, res: Response): Promise<void> => {
  const { email, password, nickname, myTeam } = req.body;
  try {
    const salt = crypto.randomBytes(16).toString("base64");
    const hashedPassword = hashPassword(password, salt);
    const [sql, values] = joinModel({ email, hashedPassword, salt, nickname, myTeam });

    const result = await pool.query(sql, values);

    res.status(StatusCodes.CREATED).json({
      message: "User successfully created",
    });
  } catch (err) {
    console.error("Error executing query", (err as Error).stack);
    res.status(500).json({
      message: "Error creating user",
    });
  }
};

export { join };
