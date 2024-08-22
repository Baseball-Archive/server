import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
    writeRepository,
    updateRepository,
    deleteRepository,
    viewListRepository,
    viewDetailRepository
} from "../models/boardModel";

export const writePost = async (req: Request, res: Response) => {
    try {
        const userUid = req.headers.authorization;
        if (!userUid) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: "인증되지 않은 사용자입니다."
            })
        }

        await writeRepository({ ...req.body, userUid });

        return res.status(StatusCodes.CREATED).json({
            message: "게시글을 성공적으로 업로드했습니다.",
        });
    } catch (err: unknown) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Internal Server Error"
        });
    }    
};

export const updatePost = async (req: Request, res: Response) => {
    try {
        const boardId = parseInt(req.params.boardId, 10);
        const userUid = req.headers.authorization;
        if (!userUid) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: "인증되지 않은 사용자입니다."
            })
        }
        
        await updateRepository(boardId, req.body);

        return res.status(StatusCodes.OK).json({
            message: "게시글을 성공적으로 수정했습니다."
        });
    } catch (err: unknown) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Internal Server Error"
        });
    } 
};

export const deletePost = async (req: Request, res: Response) => {
    try {
        const boardId = parseInt(req.params.boardId, 10);
        const userUid = req.headers.authorization;
        if (!userUid) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: "인증되지 않은 사용자입니다."
            })
        }
        
        await deleteRepository(boardId);

        return res.status(StatusCodes.OK).json({
            message: "게시글을 성공적으로 삭제했습니다."
        });
    } catch (err: unknown) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Internal Server Error"
        });
    } 
};

export const viewPostList = async (req: Request, res: Response) => {
    try {
        const userUid = req.headers.authorization;
        if (!userUid) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: "인증되지 않은 사용자입니다."
            })
        }
        
        const result = await viewListRepository();

        return res.status(StatusCodes.OK).json(result);
    } catch (err: unknown) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Internal Server Error"
        });
    } 
};

export const viewPostDetail = async (req: Request, res: Response) => {
    try {
        const boardId = parseInt(req.params.boardId, 10);
        const userUid = req.headers.authorization;
        if (!userUid) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: "인증되지 않은 사용자입니다."
            })
        }
        
        const result = await viewDetailRepository(boardId);

        return res.status(StatusCodes.OK).json(result);
    } catch (err: unknown) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Internal Server Error"
        });
    } 
};