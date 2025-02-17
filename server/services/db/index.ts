import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import pg from "pg";
import * as schema from "./schema";

const pool = new pg.Pool({
  host: process.env.POSTGRES_HOST!,
  port: Number(process.env.POSTGRES_PORT) || 5432,
  user: process.env.POSTGRES_USER!,
  password: process.env.POSTGRES_PASSWORD!,
  database: process.env.POSTGRES_DB_NAME!,
  ssl: process.env.POSTGRES_SSL === "true" ? { rejectUnauthorized: false } : false,
});

export const db = drizzle(pool, { schema });