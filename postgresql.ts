import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  user: process.env.POSTGRESQL_ROOT,
  host: process.env.HOST_NAME,
  database: process.env.DATABASE,
  password: process.env.POSTGRESQL_PASSWORD,
  port: parseInt(process.env.POSTGRESQL_PORT || "5432", 10),
});
