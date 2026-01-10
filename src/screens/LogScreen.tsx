import React from 'react';
import { Box } from '../components/Box';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Text } from '../components/Text';

export const LogScreen: React.FC = () => {
    return (
        <Box backgroundColor="background" padding="lg" style={{ flex: 1 }}>
            <Text fontFamily="patrick" size="xxl" weight="bold" style={{ textAlign: 'center', marginBottom: 32 }}>
                Kaizen 改善
            </Text>

            <Card
                time="9:00 AM"
                description="Morning meditation and goal setting for the day"
            />
            <Card
                time="2:30 PM"
                description="Completed code review and learned new debugging techniques"
            />

            <Button
                title="Back to Home"
                onPress={() => console.log('Navigate to Progress')}
                style={{ marginTop: 32 }}
            />
        </Box>
    );
};