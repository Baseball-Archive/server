import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  createPrivateArchiveModel,
  getPrivateArchivesModel,
  updatePrivateArchiveModel,
  deletePrivateArchiveModel,
} from "../models/privateArchiveModel";

export const createPrivateArchive = async (req: Request, res: Response) => {
  try {
    const userUid = req.user?.uid;
    if (!userUid) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: "User not authenticated" });
    }

    const archiveData = { ...req.body, userUid };
    const archiveId = await createPrivateArchiveModel(archiveData);
    res.status(StatusCodes.CREATED).json({ message: "created successfully", archive_id: archiveId });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
  }
};

export const getPrivateArchives = async (req: Request, res: Response) => {
  try {
    const userUid = req.user?.uid;
    if (!userUid) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: "User not authenticated" });
    }

    const archives = await getPrivateArchivesModel(userUid);
    res.status(StatusCodes.OK).json(archives);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
  }
};

export const updatePrivateArchive = async (req: Request, res: Response) => {
  try {
    const { archiveId } = req.params;
    const updatedArchiveId = await updatePrivateArchiveModel(parseInt(archiveId, 10), req.body);
    res.status(StatusCodes.OK).json({ message: "updated successfully", archiveId: updatedArchiveId });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
  }
};

export const deletePrivateArchive = async (req: Request, res: Response) => {
  try {
    const { archiveId } = req.params;
    const deletedArchiveId = await deletePrivateArchiveModel(parseInt(archiveId, 10));
    res.status(StatusCodes.OK).json({ message: "deleted successfully", archiveId: deletedArchiveId });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
  }
};
