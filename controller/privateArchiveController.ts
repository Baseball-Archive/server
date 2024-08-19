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
