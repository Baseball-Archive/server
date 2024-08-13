interface JoinModelParams {
  email: string;
  hashedPassword: string;
  salt: string;
  nickname: string;
  myTeam?: string;
}

function createUserWithoutTeam({ email, hashedPassword, salt, nickname }: JoinModelParams): [string, any[]] {
  const sql = `INSERT INTO "BaseballArchive".users (email, password, salt, nickname) VALUES ($1, $2, $3, $4)`;
  const values = [email, hashedPassword, salt, nickname];

  return [sql, values];
}

function createUserWithTeam({ email, hashedPassword, salt, nickname, myTeam }: JoinModelParams): [string, any[]] {
  const sql = `INSERT INTO "BaseballArchive".users (email, password, salt, nickname, my_team) VALUES ($1, $2, $3, $4, $5)`;
  const values = [email, hashedPassword, salt, nickname, myTeam];

  return [sql, values];
}

function joinModel(params: JoinModelParams): [string, any[]] {
  if (params.myTeam) {
    return createUserWithTeam(params);
  } else {
    return createUserWithoutTeam(params);
  }
}

export { joinModel };
