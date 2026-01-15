import { getDB } from './index'
import { Entry } from './types'

export const insertEntry = async (entry: Entry) => {
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

export const getEntries = async () => {
    const db = await getDB()
    return await db.getAllAsync<Entry>(`
    SELECT * FROM entries
    ORDER BY date DESC, time DESC
    `)
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

export const calculateStreak = async (): Promise<number> => {
    const db = await getDB()
    
    const uniqueDates = await db.getAllAsync<{ date: string }>(
        'SELECT DISTINCT date FROM entries ORDER BY date DESC'
    )
    
    if (uniqueDates.length === 0) return 0
    
    const getLocalDate = (daysAgo: number = 0) => {
        const date = new Date();
        date.setDate(date.getDate() - daysAgo);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    
    let streak = 0
    
    for (let i = 0; i < uniqueDates.length; i++) {
        const expectedDateStr = getLocalDate(i);
        
        if (uniqueDates[i].date === expectedDateStr) {
            streak++
        } else {
            break
        }
    }
    
    return streak
}