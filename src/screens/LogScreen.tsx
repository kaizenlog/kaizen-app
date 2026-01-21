import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Box } from '../components/Box';
import { Button } from '../components/Button';
import { Carousel } from '../components/Carousel';
import { Text } from '../components/Text';
import { useSchedule } from '../context/ScheduleContext';
import { getEntries, getEntriesByDate, insertEntry } from '../database/entries';
import { Entry } from '../database/types';
import { useTheme } from '../theme/ThemeContext';
import { generateTimeSlots } from '../utils/timeUtils';

export const LogScreen: React.FC = () => {
    const { config } = useSchedule();
    const { theme, isDark, toggleTheme } = useTheme();

    const getLocalDate = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const today = getLocalDate();

    const parseTime = (timeString: string) => {
        const [hour, minute] = timeString.split(':').map(Number);
        return { hour, minute };
    };

    const [timeSlots, setTimeSlots] = useState(() =>
        generateTimeSlots(
            config.interval,
            parseTime(config.startTime),
            parseTime(config.endTime)
        )
    );

    useEffect(() => {
        const newSlots = generateTimeSlots(
            config.interval,
            parseTime(config.startTime),
            parseTime(config.endTime)
        );
        setTimeSlots(newSlots);
        loadEntries();
    }, [config]);

    const loadEntries = async () => {
        try {
            // fetch all entries from today returned as an array of Entry objects
            const entries = await getEntriesByDate(today);
            const entryMap = new Map(entries.map(e => [e.time, e.description]));

            setTimeSlots(prev =>
                prev.map(slot => ({
                    ...slot,
                    description: entryMap.get(slot.time) || slot.description // update if there is an entry otherwise leave it 
                }))
            );
        } catch (error) {
            console.error('Failed to load entries:', error);
        }
    };

    const handleDescriptionChange = (index: number, newDescription: string) => {
        setTimeSlots(prev =>
            prev.map((slot, i) =>
                i === index ? { ...slot, description: newDescription } : slot
            )
        );
    };

    const handleCategoryChange = (index: number, newCategory: string) => {
        setTimeSlots(prev =>
            prev.map((slot, i) =>
                i === index ? { ...slot, category: newCategory } : slot
            )
        );
    };

    const handleSave = async () => {
        try {
            for (const slot of timeSlots) {
                if (slot.description.trim()) {
                    const entry: Entry = {
                        id: `${today}-${slot.time}`,
                        date: today,
                        time: slot.time,
                        description: slot.description,
                        created_at: Date.now()
                    };
                    await insertEntry(entry);
                }
            }
            console.log('Entries saved successfully');
        } catch (error) {
            console.error('Failed to save entries:', error);
        }
    };

    const queryDatabase = async () => {
        try {
            const entries = await getEntries();
            console.log('Database entries:', entries);
        } catch (error) {
            console.error('Failed to query database:', error);
        }
    }

    return (
        <Box backgroundColor="background" padding="lg" style={{ flex: 1 }}>
            <TouchableOpacity
                onPress={toggleTheme}
                style={{ position: 'absolute', top: 40, right: 20, zIndex: 10 }}
            >
                <Ionicons
                    name={isDark ? 'sunny' : 'moon'}
                    size={24}
                    color={theme.colors.text}
                />
            </TouchableOpacity>

            <Text fontFamily="patrick" size="xxl" weight="bold" color="primary" style={{ textAlign: 'center', marginBottom: 32, marginTop: 32 }}>
                Today's Log
            </Text>

            <Carousel
                items={timeSlots}
                onItemChange={handleDescriptionChange}
                onCategoryChange={handleCategoryChange}
                style={{ flex: 1, marginBottom: 24 }}
            />

            <Button
                title="Save"
                onPress={handleSave}
                style={{ marginBottom: 8 }}
            />

            <Button
                title="Query DB"
                onPress={queryDatabase}
            />
        </Box>
    );
};