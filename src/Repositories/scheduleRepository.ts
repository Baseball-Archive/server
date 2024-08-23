import pool from "../../config/postgresql";
import { ScheduleData } from "../types/schedule";

export const saveSchedulesRepository = async (schedules: ScheduleData[]) => {
  try {
    const insertQuery = `
      INSERT INTO baseball_schedule (match_date, time, stadium, away_team_id, home_team_id)
      VALUES ($1, $2, $3, $4, $5)
    `;

    const insertPromises = schedules.map((schedule) => {
      const formattedTime = schedule.time.slice(0, 5);

      return pool.query(insertQuery, [
        schedule.match_date,
        formattedTime,
        schedule.stadium,
        schedule.away_team_id,
        schedule.home_team_id,
      ]);
    });

    await Promise.all(insertPromises);
    console.log("경기 일정을 성공적으로 저장했습니다.");
  } catch (error) {
    console.error("경기 일정 저장 중 오류가 발생했습니다.", error);
  }
};

