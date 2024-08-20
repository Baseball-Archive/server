export const joinQuery = ({
  uid,
  nickname,
  myTeam,
}: {
  uid: string;
  nickname: string;
  myTeam: string;
}): [string, any[]] => {
  const sql = `INSERT INTO users (uid, nickname, my_team_id) VALUES ($1, $2, $3);`;
  const values = [uid, nickname, myTeam];

  return [sql, values];
};

export const checkNicknameQuery = (nickname: string): [string, any[]] => {
  const sql = `SELECT COUNT(*) FROM users WHERE nickname = $1`;
  const values = [nickname];
  return [sql, values];
};

export const getUserQuery = ({ uid }: { uid: string }): [string, any[]] => {
  const sql = `SELECT nickname, pic_url, my_team_id FROM users WHERE uid = $1`;
  const values = [uid];

  return [sql, values];
};

type EditUserParams = {
  uid: string;
  nickname: string;
  picURL?: string;
  myTeam: string;
};

const updateUserWithoutPicURL = ({
  uid,
  nickname,
  myTeam,
}: {
  uid: string;
  nickname: string;
  myTeam: string;
}): [string, (string | null)[]] => {
  const sql = `UPDATE users SET nickname = $1, my_team_id = $2 WHERE uid = $3`;
  const values = [nickname, myTeam, uid];

  return [sql, values];
};

const updateQueryWithPicURL = ({
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
  const sql = `UPDATE users SET nickname = $1, pic_url = $2, my_team_id = $3 WHERE uid = $4`;
  const values = [nickname, picURL, myTeam, uid];

  return [sql, values];
};

export const updateQuery = ({ uid, nickname, picURL, myTeam }: EditUserParams): [string, (string | null)[]] => {
  if (picURL) {
    return updateQueryWithPicURL({ uid, nickname, picURL, myTeam });
  } else {
    return updateUserWithoutPicURL({ uid, nickname, myTeam });
  }
};
