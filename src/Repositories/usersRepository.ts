import pool from "../../config/postgresql";

interface UserData {
  uid: string;
  nickname: string;
  myTeam: string;
}

export const joinRepository = async (userData: UserData): Promise<string> => {
  const { uid, nickname, myTeam } = userData;

  const query = `
    INSERT INTO users (uid, nickname, my_team_id)
    VALUES ($1, $2, $3) RETURNING uid
  `;
  const values = [uid, nickname, myTeam];

  const result = await pool.query(query, values);
  return result.rows[0].uid;
};

export const checkNicknameRepository = async (nickname: string): Promise<number> => {
  const query = `
    SELECT COUNT(*) 
    FROM users 
    WHERE nickname = $1
  `;
  const values = [nickname];

  const result = await pool.query(query, values);
  return parseInt(result.rows[0].count, 10);
};

export const getUserRepository = async (
  uid: string,
): Promise<{ nickname: string; pic_url: string; my_team_id: string } | null> => {
  const query = `
    SELECT nickname, pic_url, my_team_id 
    FROM users 
    WHERE uid = $1
  `;
  const values = [uid];

  const result = await pool.query(query, values);

  if (result.rows.length > 0) {
    return result.rows[0];
  } else {
    return null;
  }
};

type EditUserParams = {
  uid: string;
  nickname: string;
  picURL?: string;
  myTeam: string;
};
export const updateUserRepository = async ({ uid, nickname, picURL, myTeam }: EditUserParams): Promise<void> => {
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

  // 쿼리 실행
  await pool.query(sql, values);
};
