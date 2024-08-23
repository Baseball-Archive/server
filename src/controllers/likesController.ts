import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  addLikeToArchiveRepository,
  removeLikeFromArchiveRepository,
  addLikeToBoardRepository,
  removeLikeFromBoardRepository,
} from "../repositories/likesRepository";

export const addLikeToArchive = async (req: Request, res: Response) => {
  try {
    const archiveId = parseInt(req.params.archiveId, 10);
    const userUid = req.headers.authorization;
    if (!userUid) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "인증되지 않은 사용자입니다.",
      });
    }

    await addLikeToArchiveRepository({ userUid, archiveId });

    return res.status(StatusCodes.CREATED).json({
      message: "좋아요를 성공적으로 추가했습니다.",
    });
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error",
    });
  }
};

export const removeLikeFromArchive = async (req: Request, res: Response) => {
  try {
    const archiveId = parseInt(req.params.archiveId, 10);
    const userUid = req.headers.authorization;
    if (!userUid) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "인증되지 않은 사용자입니다.",
      });
    }

    await removeLikeFromArchiveRepository({ userUid, archiveId });

    return res.status(StatusCodes.OK).json({
      message: "좋아요를 성공적으로 삭제했습니다.",
    });
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error",
    });
  }
};

export const addLikeToBoard = async (req: Request, res: Response) => {
  try {
    const boardId = parseInt(req.params.boardId, 10);
    const userUid = req.headers.authorization;
    if (!userUid) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "인증되지 않은 사용자입니다.",
      });
    }

    await addLikeToBoardRepository({ userUid, boardId });

    return res.status(StatusCodes.CREATED).json({
      message: "좋아요를 성공적으로 추가했습니다.",
    });
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error",
    });
  }
};

export const removeLikeFromBoard = async (req: Request, res: Response) => {
  try {
    const boardId = parseInt(req.params.boardId, 10);
    const userUid = req.headers.authorization;
    if (!userUid) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "인증되지 않은 사용자입니다.",
      });
    }

    await removeLikeFromBoardRepository({ userUid, boardId });

    return res.status(StatusCodes.OK).json({
      message: "좋아요를 성공적으로 삭제했습니다.",
    });
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error",
    });
  }
};
