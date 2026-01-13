import * as SQLite from 'expo-sqlite'
import { createSchema } from './schema'

let db: SQLite.SQLiteDatabase | null = null

export const getDB = async () => {
    if (!db) {
        db = await SQLite.openDatabaseAsync('kaizen.db')
        await createSchema(db)
    }
    return db
}
