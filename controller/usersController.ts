import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { joinQuery, getUserQuery, editQuery } from "../model/usersModel";
import pool from "../postgresql";
import admin from "../firebaseAdmin";

const getUser = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      message: "Authorization 헤더가 누락되었거나 잘못된 형식입니다.",
    });
    return;
  }

  const idToken = authHeader.split("Bearer ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;

    const [sql, values] = getUserQuery({ uid });

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
  const { nickname, myTeam } = req.body;

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      message: "Authorization 헤더가 누락되었거나 잘못된 형식입니다.",
    });
    return;
  }

  const idToken = authHeader.split("Bearer ")[1];

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

const editUser = async (req: Request, res: Response): Promise<void> => {
  const { nickname, picURL, myTeam } = req.body;

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      message: "Authorization 헤더가 누락되었거나 잘못된 형식입니다.",
    });
    return;
  }

  const idToken = authHeader.split("Bearer ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;

    const [sql, values] = editQuery({ uid, nickname, picURL, myTeam });

    const { rows } = await pool.query(sql, values);

    res.status(StatusCodes.OK).json({
      message: "사용자 데이터를 성공적으로 수정했습니다.",
      data: rows[0],
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("쿼리 실행 중 오류 발생", err.stack);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: `사용자 데이터를 수정하는 중 오류가 발생했습니다: ${err.message}`,
      });
    } else {
      console.error("예상치 못한 오류 발생", err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "사용자 데이터를 수정하는 중 예상치 못한 오류가 발생했습니다",
      });
    }
  }
};

export { join, getUser, editUser };
