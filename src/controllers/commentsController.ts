import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  addCommentArchiveRepository,
  updateCommentArchiveRepository,
  deleteCommentArchiveRepository,
  findAllCommentArchiveRepository,
  addCommentBoardRepository,
  updateCommentBoardRepository,
  deleteCommentBoardRepository,
  findAllCommentBoardRepository,
} from "../repositories/commentsRepository";

export const addCommentToArchive = async (req: Request, res: Response) => {
  try {
    const archiveId = parseInt(req.params.archiveId, 10);
    const { content } = req.body;
    const userUid = req.user?.uid;
    if (!userUid) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "인증되지 않은 사용자입니다.",
      });
    }

    await addCommentArchiveRepository({ archiveId, userUid, content });

    return res.status(StatusCodes.CREATED).json({
      message: "댓글을 성공적으로 추가했습니다.",
    });
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error",
    });
  }
};

export const updateCommentFromArchive = async (req: Request, res: Response) => {
  try {
    const archiveId = parseInt(req.params.archiveId, 10);
    const { commentId, content } = req.body;
    const userUid = req.user?.uid;
    if (!userUid) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "인증되지 않은 사용자입니다.",
      });
    }

    await updateCommentArchiveRepository(commentId, { archiveId, userUid, content });

    return res.status(StatusCodes.OK).json({
      message: "댓글을 성공적으로 수정했습니다.",
    });
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error",
    });
  }
};

export const deleteCommentFromArchive = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.body;
    const userUid = req.user?.uid;
    if (!userUid) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "인증되지 않은 사용자입니다.",
      });
    }

    await deleteCommentArchiveRepository(commentId);

    return res.status(StatusCodes.OK).json({
      message: "댓글을 성공적으로 삭제했습니다.",
    });
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error",
    });
  }
};

export const findAllCommentFromArchive = async (req: Request, res: Response) => {
  try {
    const archiveId = parseInt(req.params.archiveId, 10);
    const userUid = req.user?.uid;
    if (!userUid) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "인증되지 않은 사용자입니다.",
      });
    }

    const result = await findAllCommentArchiveRepository(archiveId);

    return res.status(StatusCodes.OK).json(result);
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error",
    });
  }
};

export const addCommentToBoard = async (req: Request, res: Response) => {
  try {
    const boardId = parseInt(req.params.boardId, 10);
    const { content } = req.body;
    const userUid = req.user?.uid;
    if (!userUid) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "인증되지 않은 사용자입니다.",
      });
    }

    await addCommentBoardRepository({ boardId, userUid, content });

    return res.status(StatusCodes.CREATED).json({
      message: "댓글을 성공적으로 추가했습니다.",
    });
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error",
    });
  }
};

export const updateCommentFromBoard = async (req: Request, res: Response) => {
  try {
    const boardId = parseInt(req.params.boardId, 10);
    const { commentId, content } = req.body;
    const userUid = req.user?.uid;
    if (!userUid) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "인증되지 않은 사용자입니다.",
      });
    }

    await updateCommentBoardRepository(commentId, { boardId, userUid, content });

    return res.status(StatusCodes.OK).json({
      message: "댓글을 성공적으로 수정했습니다.",
    });
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error",
    });
  }
};

export const deleteCommentFromBoard = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.body;
    const userUid = req.user?.uid;
    if (!userUid) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "인증되지 않은 사용자입니다.",
      });
    }

    await deleteCommentBoardRepository(commentId);

    return res.status(StatusCodes.OK).json({
      message: "댓글을 성공적으로 삭제했습니다.",
    });
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error",
    });
  }
};

export const findAllCommentFromBoard = async (req: Request, res: Response) => {
  try {
    const boardId = parseInt(req.params.boardId, 10);
    const userUid = req.user?.uid;
    if (!userUid) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "인증되지 않은 사용자입니다.",
      });
    }

    const result = await findAllCommentBoardRepository(boardId);

    return res.status(StatusCodes.OK).json(result);
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error",
    });
  }
};
