import pool from "../../config/postgresql";
import { CommentArchiveData, CommentBoardData } from "../types/comment";

export const addCommentArchiveRepository = async (commentArchiveData: CommentArchiveData) => {
  const { archiveId, userUid, content } = commentArchiveData;

  const sql = `
    INSERT INTO comment_archive (archive_id, user_uid, content)
    VALUES ($1, $2, $3);
  `;
  const values = [archiveId, userUid, content];

  await pool.query(sql, values);
};

export const updateCommentArchiveRepository = async (commentId: number, commentArchiveData: CommentArchiveData) => {
  const { content } = commentArchiveData;

  const sql = `
    UPDATE comment_archive SET content = $1
    WHERE id = $2;
  `;
  const values = [content, commentId];

  await pool.query(sql, values);
};

export const deleteCommentArchiveRepository = async (commentId: number) => {
  const sql = `
    DELETE FROM comment_archive WHERE id = $1;
  `;
  const values = [commentId];

  await pool.query(sql, values);
};

export const findAllCommentArchiveRepository = async (archiveId: number) => {
  const sql = `
    SELECT comment_archive.id, nickname, pic_url, content, comment_archive.created_at
    FROM comment_archive LEFT JOIN users
    ON comment_archive.user_uid = users.uid
    WHERE archive_id = $1;
  `;
  const values = [archiveId];

  const result = await pool.query(sql, values);
  return result.rows;
};

export const addCommentBoardRepository = async (commentBoardData: CommentBoardData) => {
  const { boardId, userUid, content } = commentBoardData;

  const sql = `
    INSERT INTO comment_board (board_id, user_uid, content)
    VALUES ($1, $2, $3);
  `;
  const values = [boardId, userUid, content];

  await pool.query(sql, values);
};

export const updateCommentBoardRepository = async (commentId: number, commentBoardData: CommentBoardData) => {
  const { content } = commentBoardData;

  const sql = `
    UPDATE comment_board SET content = $1
    WHERE id = $2;
  `;
  const values = [content, commentId];

  await pool.query(sql, values);
};

export const deleteCommentBoardRepository = async (commentId: number) => {
  const sql = `
    DELETE FROM comment_board WHERE id = $1;
  `;
  const values = [commentId];

  await pool.query(sql, values);
};

export const findAllCommentBoardRepository = async (boardId: number) => {
  const sql = `
    SELECT comment_board.id, nickname, pic_url, content, comment_board.created_at
    FROM comment_board LEFT JOIN users
    ON comment_board.user_uid = users.uid
    WHERE board_id = $1;
  `;
  const values = [boardId];

  const result = await pool.query(sql, values);
  return result.rows;
};
