export const joinQuery = ({
  uid,
  nickname,
  myTeam,
}: {
  uid: string;
  nickname: string;
  myTeam: string;
}): [string, any[]] => {
  const sql = `
        INSERT INTO "BaseballArchive".users (uid, nickname, my_team) 
        VALUES ($1, $2, $3);
      `;
  const values = [uid, nickname, myTeam];
  return [sql, values];
};
