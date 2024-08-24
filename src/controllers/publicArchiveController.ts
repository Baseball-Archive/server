import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { findAllArchiveRepository, findArchiveRepository } from "../repositories/publicArchiveRepository";

export const findAllArchive = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string);
    const currentPage = parseInt(req.query.currentPage as string);
    const userUid = req.user?.uid;
    if (!userUid) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "인증되지 않은 사용자입니다.",
      });
    }

    const offset = limit * (currentPage - 1);
    const result = await findAllArchiveRepository(limit, offset);

    return res.status(StatusCodes.OK).json(result);
  } catch (err: unknown) {
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error",
    });
  }
};

export const findArchive = async (req: Request, res: Response) => {
  try {
    const archiveId = parseInt(req.params.archiveId, 10);
    const userUid = req.user?.uid;
    if (!userUid) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "인증되지 않은 사용자입니다.",
      });
    }

    const result = await findArchiveRepository(archiveId);

    return res.status(StatusCodes.OK).json(result);
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error",
    });
  }
};
