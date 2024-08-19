import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import pool from "../postgresql";
import { joinQuery, getQuery } from "../model/usersModel";
import admin from "../firebaseAdmin";

const getUser = async (req: Request, res: Response) => {
  const { idToken } = req.body;
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;

    const [sql, values] = getQuery({ uid });

    const { rows } = await pool.query(sql, values);

    if (rows.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "사용자를 찾을 수 없습니다",
      });
    }

    return res.status(StatusCodes.OK).json({
      message: "사용자 데이터를 성공적으로 가져왔습니다",
      data: rows[0],
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("쿼리 실행 중 오류 발생", err.stack);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: `사용자 데이터를 가져오는 중 오류가 발생했습니다: ${err.message}`,
      });
    } else {
      console.error("예상치 못한 오류 발생", err);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "사용자 데이터를 가져오는 중 예상치 못한 오류가 발생했습니다",
      });
    }
  }
};

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

export { join, getUser };
