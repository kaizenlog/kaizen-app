import * as SQLite from 'expo-sqlite'

export const createSchema = async (db: SQLite.SQLiteDatabase) => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS entries (
      id TEXT PRIMARY KEY NOT NULL,
      date TEXT NOT NULL,           -- YYYY-MM-DD
      time TEXT NOT NULL,           -- HH:mm
      description TEXT,
      category TEXT,
      created_at INTEGER NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_entries_date
    ON entries (date);
  `)
}
