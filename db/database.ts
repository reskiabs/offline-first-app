import * as SQLite from "expo-sqlite";

let db: SQLite.SQLiteDatabase;

export const initDB = async () => {
  db = await SQLite.openDatabaseAsync("app.db");

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS todos (
      id TEXT PRIMARY KEY,
      title TEXT,
      status TEXT,
      created_at TEXT
    );
  `);
};

export const getDB = () => db;
