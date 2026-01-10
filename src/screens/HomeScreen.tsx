import React from 'react';
import { Box } from '../components/Box';
import { Button } from '../components/Button';
import { Text } from '../components/Text';
import { Carousel } from '../components/Carousel';

export const HomeScreen: React.FC = () => {
  const carouselItems = [
    { time: '9:00 AM', description: 'Morning meditation and goal setting for the day' },
    { time: '10:30 AM', description: 'Completed first task of the day with focused attention' },
    { time: '2:30 PM', description: 'Learned new debugging techniques during code review' },
    { time: '4:00 PM', description: 'Practiced mindful breathing during break' },
    { time: '6:30 PM', description: 'Reflected on daily achievements and areas for improvement' },
  ];

  return (
    <Box backgroundColor="background" padding="lg" style={{ flex: 1 }}>
      <Text fontFamily="patrick" size="xxl" weight="bold" style={{ textAlign: 'center', marginBottom: 32 }}>
        Kaizen 改善
      </Text>
      <Text size="lg" color="textSecondary" style={{ textAlign: 'center', marginBottom: 24 }}>
        Today's Journey
      </Text>

      <Carousel items={carouselItems} style={{ flex: 1, marginBottom: 24 }} />

      <Button
        title="Add Entry"
        onPress={() => console.log('Add new entry')}
      />
    </Box>
  );
};