import pool from "../../config/postgresql";
import { LikeArchiveData, LikeBoardData } from "../types/like";

export const addLikeToArchiveRepository = async (likeArchiveData: LikeArchiveData) => {
  const { userUid, archiveId } = likeArchiveData;

  const sql = `
        INSERT INTO like_archive (user_uid, archive_id)
        VALUES ($1, $2);
    `;
  const values = [userUid, archiveId];

  await pool.query(sql, values);
};

export const removeLikeFromArchiveRepository = async (likeArchiveData: LikeArchiveData) => {
  const { userUid, archiveId } = likeArchiveData;

  const sql = `
        DELETE FROM like_archive
        WHERE user_uid = $1 AND archive_id = $2
    `;
  const values = [userUid, archiveId];

  await pool.query(sql, values);
};

export const addLikeToBoardRepository = async (likeBoardData: LikeBoardData) => {
  const { userUid, boardId } = likeBoardData;

  const sql = `
        INSERT INTO like_board (user_uid, board_id)
        VALUES ($1, $2);
    `;
  const values = [userUid, boardId];

  await pool.query(sql, values);
};

export const removeLikeFromBoardRepository = async (likeBoardData: LikeBoardData) => {
  const { userUid, boardId } = likeBoardData;

  const sql = `
        DELETE FROM like_board
        WHERE user_uid = $1 AND board_id = $2
    `;
  const values = [userUid, boardId];

  await pool.query(sql, values);
};
