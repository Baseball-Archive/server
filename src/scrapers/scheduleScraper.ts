import puppeteer from "puppeteer";
import { ScheduleData } from "../types/schedule";

const teamMap: { [key: string]: number } = {
  두산: 1,
  롯데: 2,
  삼성: 3,
  키움: 4,
  한화: 5,
  KIA: 6,
  KT: 7,
  LG: 8,
  NC: 9,
  SSG: 10,
};

export const scrapeSchedule = async (): Promise<ScheduleData[]> => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 1024 });

  const allSchedules: ScheduleData[] = [];
  const startDate = new Date("2024-03-01");
  const endDate = new Date("2024-09-30");
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const dateString = currentDate.toISOString().split("T")[0];
    const url = `https://m.sports.naver.com/kbaseball/schedule/index?date=${dateString}`;

    try {
      await page.goto(url, { waitUntil: "networkidle2" });

      const schedules = await page.evaluate(
        (teamMap, dateString) => {
          const elements = document.querySelectorAll(".ScheduleAllType_match_list__3n5L_ li");
          const results: ScheduleData[] = [];

          elements.forEach((element) => {
            const time =
              element.querySelector(".MatchBox_time__nIEfd")?.textContent?.replace("경기 시간", "").trim() || "";
            const stadium =
              element.querySelector(".MatchBox_stadium__13gft")?.textContent?.replace("경기장", "").trim() || "";
            const awayTeam =
              element
                .querySelectorAll(".MatchBoxTeamArea_team_item__3w5mq")[0]
                ?.querySelector(".MatchBoxTeamArea_team__3aB4O")
                ?.textContent?.trim() || "";
            const homeTeam =
              element
                .querySelectorAll(".MatchBoxTeamArea_team_item__3w5mq")[1]
                ?.querySelector(".MatchBoxTeamArea_team__3aB4O")
                ?.textContent?.trim() || "";

            if (awayTeam && homeTeam) {
              results.push({
                match_date: dateString,
                time,
                stadium,
                away_team_id: teamMap[awayTeam] || 11,
                home_team_id: teamMap[homeTeam] || 11,
              });
            }
          });

          return results;
        },
        teamMap,
        dateString,
      );

      allSchedules.push(...schedules);
      console.log(allSchedules);
    } catch (error) {
      console.error(`Error fetching schedule for ${dateString}:`, error);
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  await browser.close();
  return allSchedules;
};
