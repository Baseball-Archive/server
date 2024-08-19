import pool from "../postgresql";
import { ArchiveData } from "../types/archive";

export const createPrivateArchive = async (archiveData: ArchiveData) => {
  const { schedule_id, weather, home_team_score, away_team_score, title, content, pic_url, is_public, user_uid } =
    archiveData;
  const created_at = new Date();
  const updated_at = created_at;

  const query = `
    INSERT INTO archive (schedule_id, weather, home_team_score, away_team_score, title, content, pic_url, is_public, created_at, updated_at, user_uid)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id
  `;
  const values = [
    schedule_id,
    weather,
    home_team_score,
    away_team_score,
    title,
    content,
    pic_url,
    is_public,
    created_at,
    updated_at,
    user_uid,
  ];

  const result = await pool.query(query, values);
  return result.rows[0].id;
};
