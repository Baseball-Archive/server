import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { scrapeSchedule } from "../scrapers/scheduleScraper";
import { saveSchedulesRepository, getSchedulesRepository } from "../Repositories/scheduleRepository";

export const saveSchedules = async (req: Request, res: Response) => {
  try {
    const schedules = await scrapeSchedule();
    await saveSchedulesRepository(schedules);
    res.status(StatusCodes.OK).json({ message: "경기 일정을 성공적으로 저장했습니다." });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "경기 일정을 저장하는데 실패했습니다." });
  }
};

export const getSchedules = async (req: Request, res: Response) => {
  try {
    const { date } = req.params;
    const schedules = await getSchedulesRepository(date);
    if (schedules.length > 0) {
      res.status(StatusCodes.OK).json(schedules);
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ message: "해당 날짜의 경기 일정을 찾을 수 없습니다." });
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "경기 일정을 불러오는데 실패했습니다." });
  }
};
