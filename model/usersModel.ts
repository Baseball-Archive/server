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

export const updateQuery = ({ uid, nickname, picURL, myTeam }: EditUserParams): [string, (string | null)[]] => {
  let sql = "UPDATE users SET ";
  const values: (string | null)[] = [];
  let index = 1;

  // nickname 필드 추가
  sql += `nickname = $${index++}`;
  values.push(nickname);

  // myTeam 필드 추가
  sql += `, my_team_id = $${index++}`;
  values.push(myTeam);

  // picURL 필드가 있는 경우
  if (picURL) {
    sql += `, pic_url = $${index++}`;
    values.push(picURL);
  }

  // WHERE 조건 추가
  sql += ` WHERE uid = $${index}`;
  values.push(uid);

  return [sql, values];
};
