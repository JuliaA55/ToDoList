import * as SQLite from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { sql } from "drizzle-orm";

const db = SQLite.openDatabaseSync("tasks.db");
export const drizzleDb = drizzle(db);

export async function setupDatabase() {
  await drizzleDb.run(sql`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      todo TEXT NOT NULL,
      completed BOOLEAN NOT NULL DEFAULT 0
    );
  `);
}
