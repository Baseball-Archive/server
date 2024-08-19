import { Request, Response, NextFunction } from "express";
import admin from "firebase-admin";
import { StatusCodes } from "http-status-codes";

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

export const authenticateFirebaseToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Authorization 헤더가 누락되었거나 잘못된 형식입니다." });
  }

  const idToken = authHeader.split("Bearer ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
    };
    return next();
  } catch (error) {
    console.error("토큰 검증 중 오류가 발생했습니다.", error);
    res.status(StatusCodes.UNAUTHORIZED).json({ message: "유효하지 않거나 만료된 토큰입니다." });
  }
};
