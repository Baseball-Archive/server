import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  user: process.env.POSTGRESQL_ROOT,
  host: process.env.HOST_NAME,
  database: process.env.DATABASE,
  password: process.env.POSTGRESQL_PASSWORD,
  port: parseInt(process.env.POSTGRESQL_PORT || "5432", 10),

  //이부분이 없으면 배포된 db와 연동이 실패한다. 보안상으로 다르게 설정할 필요가 있어보인다.
  ssl: { rejectUnauthorized: false },
});

export default pool;
