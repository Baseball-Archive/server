import pool from "../../config/postgresql";

export const findAllArchiveRepository = async () => {
  const sql = `
          SELECT home_team_id, away_team_id, title, created_at, user_uid
          FROM archive LEFT JOIN baseball_schedule
          ON archive.schedule_id = baseball_schedule.id
          WHERE is_public = true;
      `;

  const result = await pool.query(sql);
  return result.rows;
};

export const findArchiveRepository = async (archiveId: number) => {
  const sql = `
          SELECT match_date, home_team_id, away_team_id, title, content, pic_url, created_at, user_uid,
          (SELECT COUNT(*) FROM like_archive WHERE archive_id = $1) AS likes,
          (SELECT COUNT(*) FROM comment_archive WHERE archive_id = $1) AS comments
          FROM archive LEFT JOIN baseball_schedule
          ON archive.schedule_id = baseball_schedule.id
          WHERE archive.id = $1 
      `;

  const result = await pool.query(sql, [archiveId]);
  return result.rows[0];
};
