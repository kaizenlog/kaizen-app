import React, { useState, useEffect } from 'react';
import { Box } from '../components/Box';
import { Button } from '../components/Button';
import { Carousel } from '../components/Carousel';
import { Text } from '../components/Text';
import { generateTimeSlots } from '../utils/timeUtils';
import { useSchedule } from '../context/ScheduleContext';

export const LogScreen: React.FC = () => {
    const { config } = useSchedule();
    
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
    }, [config]);

    const handleDescriptionChange = (index: number, newDescription: string) => {
        setTimeSlots(prev =>
            prev.map((slot, i) =>
                i === index ? { ...slot, description: newDescription } : slot
            )
        );
    };

    return (
        <Box backgroundColor="background" padding="lg" style={{ flex: 1 }}>
            <Text fontFamily="patrick" size="xxl" weight="bold" style={{ textAlign: 'center', marginBottom: 32 }}>
                Today's Log
            </Text>

            <Carousel
                items={timeSlots}
                onItemChange={handleDescriptionChange}
                style={{ flex: 1, marginBottom: 24 }}
            />

            <Button
                title="Clear All"
                variant="secondary"
                onPress={() => {
                    const newSlots = generateTimeSlots(
                        config.interval, 
                        parseTime(config.startTime), 
                        parseTime(config.endTime)
                    );
                    setTimeSlots(newSlots);
                }}
            />
        </Box>
    );
};