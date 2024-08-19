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

export const getUserQuery = ({ uid }: { uid: string }): [string, any[]] => {
  const sql = `SELECT nickname, pic_url, my_team FROM "BaseballArchive".users WHERE uid = $1`;
  const values = [uid];

  return [sql, values];
};

type EditUserParams = {
  uid: string;
  nickname: string;
  picURL?: string;
  myTeam: string;
};

const editUserWithoutPicURL = ({
  uid,
  nickname,
  myTeam,
}: {
  uid: string;
  nickname: string;
  myTeam: string;
}): [string, (string | null)[]] => {
  const sql = `UPDATE "BaseballArchive".users SET nickname = $1, my_team = $2 WHERE uid = $3`;
  const values = [nickname, myTeam, uid];

  return [sql, values];
};

const editQueryWithPicURL = ({
  uid,
  nickname,
  picURL,
  myTeam,
}: {
  uid: string;
  nickname: string;
  picURL: string;
  myTeam: string;
}): [string, (string | null)[]] => {
  const sql = `UPDATE "BaseballArchive".users SET nickname = $1, pic_url = $2, my_team = $3 WHERE uid = $4`;
  const values = [nickname, picURL, myTeam, uid];

  return [sql, values];
};

export const editQuery = ({ uid, nickname, picURL, myTeam }: EditUserParams): [string, (string | null)[]] => {
  if (picURL) {
    return editQueryWithPicURL({ uid, nickname, picURL, myTeam });
  } else {
    return editUserWithoutPicURL({ uid, nickname, myTeam });
  }
};
