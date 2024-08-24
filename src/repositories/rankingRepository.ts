import pool from "../../config/postgresql";
import { rankingData } from "../types/ranking";

export const saveRankingRepository = async (rankings: rankingData[]) => {
  try {
    const truncateQuery = `TRUNCATE TABLE baseball_ranking`;

    const insertQuery = `
      INSERT INTO baseball_ranking (rank, baseball_team_id, games, wins, losses, draws, winning_rate)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;

    await pool.query(truncateQuery);

    const insertPromises = rankings.map((ranking) =>
      pool.query(insertQuery, [
        ranking.rank,
        ranking.baseball_team_id,
        ranking.games,
        ranking.wins,
        ranking.losses,
        ranking.draws,
        ranking.winning_rate,
      ]),
    );

    await Promise.all(insertPromises);

    console.log("리그 순위 정보가 성공적으로 저장되었습니다.");
  } catch (error) {
    console.error("리그 순위 정보 저장 중 오류가 발생했습니다.", error);
    throw error;
  }
};

export const getRankingRepository = async (): Promise<rankingData[]> => {
  const query = `
    SELECT rank, baseball_team_id, games, wins, losses, draws, winning_rate
    FROM baseball_ranking
    ORDER BY rank ASC
  `;
  const result = await pool.query(query);
  return result.rows;
};
