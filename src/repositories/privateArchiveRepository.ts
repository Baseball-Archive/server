import pool from "../../config/postgresql";
import { ArchiveData } from "../types/archive";

export const createPrivateArchiveRepository = async (archiveData: ArchiveData) => {
  const { schedule_id, weather, home_team_score, away_team_score, title, content, pic_url, is_public, user_uid } =
    archiveData;

  const query = `
    INSERT INTO archive (schedule_id, weather, home_team_score, away_team_score, title, content, pic_url, is_public,user_uid)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
  `;
  const values = [schedule_id, weather, home_team_score, away_team_score, title, content, pic_url, is_public, user_uid];

  await pool.query(query, values);
};

export const getPrivateArchivesRepository = async (user_uid: string) => {
  const query = `
    SELECT
      a.id,
      a.schedule_id,
      a.weather,
      a.home_team_score,
      a.away_team_score,
      a.title,
      a.content,
      a.pic_url,
      a.is_public,
      a.created_at,
      a.updated_at,
      u.nickname,
      u.pic_url AS user_pic_url,
      s.match_date,
      s.time,
      s.stadium,
      s.away_team_id,
      s.home_team_id
    FROM
      archive a
    JOIN
      users u ON a.user_uid = u.uid
    JOIN
      baseball_schedule s ON a.schedule_id = s.id
    WHERE
      a.user_uid = $1
`;
  const values = [user_uid];

  const result = await pool.query(query, values);
  return result.rows;
};

export const updatePrivateArchiveRepository = async (archiveId: number, archiveData: ArchiveData) => {
  const { weather, home_team_score, away_team_score, title, content, pic_url, is_public } = archiveData;
  const updated_at = new Date();

  const query = `
    UPDATE archive
    SET weather = $1, home_team_score = $2, away_team_score = $3, title = $4, content = $5, pic_url = $6, is_public = $7, updated_at = $8
    WHERE id = $9
  `;
  const values = [weather, home_team_score, away_team_score, title, content, pic_url, is_public, updated_at, archiveId];

  await pool.query(query, values);
};

export const deletePrivateArchiveRepository = async (archiveId: number) => {
  const query = `
    DELETE FROM archive WHERE id = $1
  `;
  const values = [archiveId];

  await pool.query(query, values);
};
