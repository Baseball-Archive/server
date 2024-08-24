import pool from "../../config/postgresql";

export const findAllArchiveRepository = async (limit: number, offset: number) => {
  const sql = `
    SELECT archive.id,
    (SELECT name FROM baseball_team WHERE baseball_team.id = home_team_id) AS home_team_name,
    (SELECT name FROM baseball_team WHERE baseball_team.id = away_team_id) AS away_team_name,
    title, archive.created_at, nickname, baseball_team.name AS my_team_name,
    (SELECT COUNT(*) FROM like_archive WHERE archive_id = archive.id) AS likes,
    (SELECT COUNT(*) FROM comment_archive WHERE archive_id = archive.id) AS comments
    FROM archive LEFT JOIN baseball_schedule
    ON archive.schedule_id = baseball_schedule.id
    LEFT JOIN users
    ON archive.user_uid = users.uid
    LEFT JOIN baseball_team
    ON users.my_team_id = baseball_team.id
    WHERE is_public = true
    LIMIT $1 OFFSET $2;
  `;
  const values = [limit, offset];

  const result = await pool.query(sql, values);
  return result.rows;
};

export const findArchiveRepository = async (archiveId: number) => {
  const sql = `
    SELECT archive.id, match_date,
    (SELECT name FROM baseball_team WHERE baseball_team.id = home_team_id) AS home_team_name,
    (SELECT name FROM baseball_team WHERE baseball_team.id = away_team_id) AS away_team_name,
    stadium, weather, home_team_score, away_team_score, title, content, archive.pic_url, archive.created_at, nickname, baseball_team.name AS my_team_name,
    (SELECT COUNT(*) FROM like_archive WHERE archive_id = $1) AS likes,
    (SELECT COUNT(*) FROM comment_archive WHERE archive_id = $1) AS comments
    FROM archive LEFT JOIN baseball_schedule
    ON archive.schedule_id = baseball_schedule.id
    LEFT JOIN users
    ON archive.user_uid = users.uid
    LEFT JOIN baseball_team
    ON users.my_team_id = baseball_team.id
    WHERE archive.id = $1 
  `;

  const result = await pool.query(sql, [archiveId]);
  return result.rows[0];
};
