import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as archiveModel from "../model/privateArchiveModel";

export const createPrivateArchive = async (req: Request, res: Response) => {
  try {
    const user_uid = req.user?.uid;
    if (!user_uid) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: "User not authenticated" });
    }

    const archiveData = { ...req.body, user_uid };
    const archiveId = await archiveModel.createPrivateArchive(archiveData);
    res.status(StatusCodes.CREATED).json({ message: "created successfully", archive_id: archiveId });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
  }
};

export const getPrivateArchives = async (req: Request, res: Response) => {
  try {
    const user_uid = req.user?.uid;
    if (!user_uid) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: "User not authenticated" });
    }

    const archives = await archiveModel.getPrivateArchives(user_uid);
    res.status(StatusCodes.OK).json(archives);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
  }
};

export const updatePrivateArchive = async (req: Request, res: Response) => {
  try {
    const { archiveId } = req.params;
    const updatedArchiveId = await archiveModel.updatePrivateArchive(parseInt(archiveId), req.body);
    res.status(StatusCodes.OK).json({ message: "updated successfully", archive_id: updatedArchiveId });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
  }
};

export const deletePrivateArchive = async (req: Request, res: Response) => {
  try {
    const { archiveId } = req.params;
    const deletedArchiveId = await archiveModel.deletePrivateArchive(parseInt(archiveId));
    res.status(StatusCodes.OK).json({ message: "deleted successfully", archive_id: deletedArchiveId });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
  }
};
