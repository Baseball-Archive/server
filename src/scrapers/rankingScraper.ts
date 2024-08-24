import puppeteer from "puppeteer";

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

interface TeamRanking {
  rank: number;
  baseball_team_id: number;
  games: number;
  wins: number;
  losses: number;
  draws: number;
  winning_rate: number;
}

export async function getLeagueRanking() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const url = `https://sports.news.naver.com/kbaseball/record/index?category=kbo`;

  try {
    await page.goto(url, { waitUntil: "networkidle2" });

    const rankings = await page.evaluate((teamMap) => {
      const rows = document.querySelectorAll("#regularTeamRecordList_table tr");
      const data: TeamRanking[] = [];

      rows.forEach((row) => {
        const rank = Number(row.querySelector("th")?.textContent?.trim());
        const team_name = row.querySelector(".tm span:last-child")?.textContent?.trim() || "";
        const games = Number(row.querySelector("td:nth-child(3)")?.textContent?.trim());
        const wins = Number(row.querySelector("td:nth-child(4)")?.textContent?.trim());
        const losses = Number(row.querySelector("td:nth-child(5)")?.textContent?.trim());
        const draws = Number(row.querySelector("td:nth-child(6)")?.textContent?.trim());
        const winning_rate = parseFloat(row.querySelector("td:nth-child(7)")?.textContent?.trim() || "");
        const baseball_team_id = teamMap[team_name];

        if (baseball_team_id) {
          data.push({
            rank,
            baseball_team_id,
            games,
            wins,
            losses,
            draws,
            winning_rate,
          });
        }
      });
      return data;
    }, teamMap);

    return rankings;
  } catch (error) {
    console.error(error);
    return [];
  } finally {
    await browser.close();
  }
}
