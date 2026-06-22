import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "../../db/schema";
import { join } from "path";

const DB_PATH = process.env.DB_PATH || join(process.cwd(), "data", "turkuntarihi.db");

const client = new Database(DB_PATH);
client.pragma("journal_mode = WAL");

export const db = drizzle(client, { schema });

export function getDb() {
  return db;
}
