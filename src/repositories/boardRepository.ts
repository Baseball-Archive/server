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

export const findAllPostRepository = async (limit: number, offset: number) => {
  const sql = `
    SELECT board.id,
    (SELECT name FROM baseball_team WHERE baseball_team.id = home_team_id) AS home_team_name,
    (SELECT name FROM baseball_team WHERE baseball_team.id = away_team_id) AS away_team_name,
    title, board.created_at, nickname, baseball_team.name AS my_team_name,
    (SELECT COUNT(*) FROM like_board WHERE board_id = board.id) AS likes,
    (SELECT COUNT(*) FROM comment_board WHERE board_id = board.id) AS comments
    FROM board LEFT JOIN baseball_schedule
    ON board.schedule_id = baseball_schedule.id
    LEFT JOIN users
    ON board.user_uid = users.uid
    LEFT JOIN baseball_team
    ON users.my_team_id = baseball_team.id
    ORDER BY board.id DESC
    LIMIT $1 OFFSET $2;
  `;
  const values = [limit, offset];

  const result = await pool.query(sql, values);
  return result.rows;
};

export const findPostRepository = async (boardId: number) => {
  const sql = `
    SELECT board.id, match_date,
    (SELECT name FROM baseball_team WHERE baseball_team.id = home_team_id) AS home_team_name,
    (SELECT name FROM baseball_team WHERE baseball_team.id = away_team_id) AS away_team_name,
    title, content, board.pic_url, board.created_at, nickname, baseball_team.name AS my_team_name,
    (SELECT COUNT(*) FROM like_board WHERE board_id = $1) AS likes,
    (SELECT COUNT(*) FROM comment_board WHERE board_id = $1) AS comments
    FROM board LEFT JOIN baseball_schedule
    ON board.schedule_id = baseball_schedule.id
    LEFT JOIN users
    ON board.user_uid = users.uid
    LEFT JOIN baseball_team
    ON users.my_team_id = baseball_team.id
    WHERE board.id = $1 
  `;

  const result = await pool.query(sql, [boardId]);
  return result.rows[0];
};
