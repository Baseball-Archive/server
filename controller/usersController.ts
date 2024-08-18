import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import pool from "../postgresql";
import { joinQuery } from "../model/usersModel";
import admin from "../firebaseAdmin";

const join = async (req: Request, res: Response): Promise<void> => {
  const { idToken, nickname, myTeam } = req.body;

  try {
    // Firebase ID 토큰 검증
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;

    const [sql, values] = joinQuery({ uid, nickname, myTeam });

    await pool.query(sql, values);

    res.status(StatusCodes.CREATED).json({
      message: "사용자가 성공적으로 생성되었습니다",
    });
  } catch (err) {
    console.error("쿼리 실행 중 오류 발생", (err as Error).stack);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "사용자 생성 중 오류 발생",
    });
  }
};

export { join };
