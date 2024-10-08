import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  createPrivateArchiveRepository,
  getPrivateArchivesRepository,
  updatePrivateArchiveRepository,
  deletePrivateArchiveRepository,
} from "../repositories/privateArchiveRepository";

export const createPrivateArchive = async (req: Request, res: Response) => {
  try {
    const userUid = req.user?.uid;
    if (!userUid) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: "User not authenticated" });
    }

    const archiveData = { ...req.body, user_uid: userUid };
    const archiveId = await createPrivateArchiveRepository(archiveData);
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

    const archives = await getPrivateArchivesRepository(userUid);

    if (archives.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "No archives found for this user" });
    }

    res.status(StatusCodes.OK).json(archives);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
  }
};

export const updatePrivateArchive = async (req: Request, res: Response) => {
  try {
    const { archiveId } = req.params;
    const updatedArchiveId = await updatePrivateArchiveRepository(parseInt(archiveId, 10), req.body);
    res.status(StatusCodes.OK).json({ message: "updated successfully", archiveId: updatedArchiveId });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
  }
};

export const deletePrivateArchive = async (req: Request, res: Response) => {
  try {
    const { archiveId } = req.params;
    const deletedArchiveId = await deletePrivateArchiveRepository(parseInt(archiveId, 10));
    res.status(StatusCodes.OK).json({ message: "deleted successfully", archiveId: deletedArchiveId });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
  }
};
