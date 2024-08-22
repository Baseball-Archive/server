import pool from "../../config/postgresql";
import { BoardData } from "../types/board";

export const addPostRepository = async (boardData: BoardData) => {
  const { scheduleId, title, content, picUrl, userUid } = boardData;

  const sql = `
        INSERT INTO board (schedule_id, title, content, pic_url, user_uid)
        VALUES ($1, $2, $3, $4, $5);
    `;
  const values = [scheduleId, title, content, picUrl, userUid];

  await pool.query(sql, values);
};

export const updatePostRepository = async (boardId: number, boardData: BoardData) => {
  const { scheduleId, title, content, picUrl } = boardData;

  const sql = `
        UPDATE board SET schedule_id = $1, title = $2, content = $3, pic_url = $4
        WHERE id = $5;
    `;
  const values = [scheduleId, title, content, picUrl, boardId];

  await pool.query(sql, values);
};

export const deletePostRepository = async (boardId: number) => {
  const sql = `
        DELETE FROM board WHERE id = $1 
    `;

  await pool.query(sql, [boardId]);
};

export const viewPostListRepository = async () => {
  const sql = `
        SELECT home_team_id, away_team_id, title, created_at, user_uid
        FROM board LEFT JOIN baseball_schedule
        ON board.schedule_id = baseball_schedule.id;
    `;

  const result = await pool.query(sql);
  return result.rows;
};

export const viewPostDetailRepository = async (boardId: number) => {
  const sql = `
        SELECT match_date, home_team_id, away_team_id, title, content, pic_url, created_at, user_uid
        FROM board LEFT JOIN baseball_schedule
        ON board.schedule_id = baseball_schedule.id
        WHERE board.id = $1 
    `;

  const result = await pool.query(sql, [boardId]);
  return result.rows[0];
};
