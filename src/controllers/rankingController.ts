import { Request, Response } from "express";
import { getLeagueRanking } from "../scrapers/rankingScraper";
import { saveRankingRepository, getRankingRepository } from "../Repositories/rankingRepository";
import { StatusCodes } from "http-status-codes";

export const saveRanking = async (req: Request, res: Response) => {
  try {
    const rankings = await getLeagueRanking();
    await saveRankingRepository(rankings);
    res.status(StatusCodes.OK).json({ message: "리그 순위 정보가 성공적으로 저장되었습니다." });
  } catch (error) {
    console.error("리그 순위 저장 실패", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "리그 순위 저장 실패" });
  }
};

export const getRanking = async (req: Request, res: Response) => {
  try {
    const rankings = await getRankingRepository();
    res.status(StatusCodes.OK).json(rankings);
  } catch (error) {
    console.error("리그 순위 조회 실패", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "리그 순위 조회 실패" });
  }
};
