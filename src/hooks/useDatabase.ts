import { useState, useEffect } from 'react';
import { initializeDatabase } from '../database/database';
import { timeEntryService, TimeEntry } from '../database/timeEntryService';

export const useDatabase = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const setupDatabase = async () => {
      try {
        await initializeDatabase();
        setIsReady(true);
      } catch (error) {
        console.error('Database initialization failed:', error);
      }
    };

    setupDatabase();
  }, []);

  const saveTimeEntry = async (date: string, time: string, description: string) => {
    if (!isReady) return;
    
    try {
      await timeEntryService.saveEntry({ date, time, description });
    } catch (error) {
      console.error('Failed to save entry:', error);
    }
  };

  const loadTimeEntries = async (date: string): Promise<TimeEntry[]> => {
    if (!isReady) return [];
    
    try {
      return await timeEntryService.getEntriesForDate(date);
    } catch (error) {
      console.error('Failed to load entries:', error);
      return [];
    }
  };

  return {
    isReady,
    saveTimeEntry,
    loadTimeEntries,
  };
};