import React from 'react';
import { Box } from '../components/Box';
import { Text } from '../components/Text';

export const ProgressScreen: React.FC = () => {
  return (
    <Box backgroundColor="background" padding="lg" style={{ flex: 1 }}>
      <Text size="xl" weight="bold" style={{ marginBottom: 24 }}>
        Your Progress
      </Text>
      <Text color="textSecondary">
        Track your continuous improvement journey here.
      </Text>
    </Box>
  );
};