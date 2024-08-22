import pool from "../../config/postgresql";
import { ArchiveData } from "../types/archive";

export const createPrivateArchiveModel = async (archiveData: ArchiveData) => {
  const { schedule_id, weather, home_team_score, away_team_score, title, content, pic_url, is_public, user_uid } =
    archiveData;

  const query = `
    INSERT INTO archive (schedule_id, weather, home_team_score, away_team_score, title, content, pic_url, is_public,user_uid)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id
  `;
  const values = [schedule_id, weather, home_team_score, away_team_score, title, content, pic_url, is_public, user_uid];

  const result = await pool.query(query, values);
  return result.rows[0].id;
};

export const getPrivateArchivesModel = async (user_uid: string) => {
  const query = `
  SELECT id, schedule_id, weather, home_team_score, away_team_score, title, content, pic_url, is_public, created_at, updated_at
  FROM archive
  WHERE user_uid = $1
`;
  const values = [user_uid];

  const result = await pool.query(query, values);
  return result.rows;
};

export const updatePrivateArchiveModel = async (archiveId: number, archiveData: ArchiveData) => {
  const { weather, home_team_score, away_team_score, title, content, pic_url, is_public } = archiveData;
  const updated_at = new Date();

  const query = `
    UPDATE archive
    SET weather = $1, home_team_score = $2, away_team_score = $3, title = $4, content = $5, pic_url = $6, is_public = $7, updated_at = $8
    WHERE id = $9 RETURNING id
  `;
  const values = [weather, home_team_score, away_team_score, title, content, pic_url, is_public, updated_at, archiveId];

  const result = await pool.query(query, values);
  return result.rows[0].id;
};

export const deletePrivateArchiveModel = async (archiveId: number) => {
  const query = `
    DELETE FROM archive WHERE id = $1 RETURNING id
  `;
  const values = [archiveId];

  const result = await pool.query(query, values);
  return result.rows[0].id;
};
