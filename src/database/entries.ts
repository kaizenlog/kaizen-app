import { getDB } from './index'
import { Entry } from './types'

export const upsertEntry = async (entry: Entry) => {
    const db = await getDB()

    await db.runAsync(
        `
    INSERT OR REPLACE INTO entries
    (id, date, time, description, category, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
    `,
        [
            entry.id,
            entry.date,
            entry.time,
            entry.description,
            entry.category ?? null, // category will be null if not defined
            entry.created_at,
        ]
    )
}


export const getEntriesByDate = async (date: string): Promise<Entry[]> => {
    const db = await getDB()

    return await db.getAllAsync<Entry>(
        `
    SELECT * FROM entries
    WHERE date = ?
    ORDER BY time ASC
    `,
        [date]
    )
}
