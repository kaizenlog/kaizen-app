import React from 'react';
import { Box } from '../components/Box';
import { Button } from '../components/Button';
import { Text } from '../components/Text';

export const HomeScreen: React.FC = () => {
  return (
    <Box backgroundColor="background" padding="lg" style={{ flex: 1 }}>
      <Text fontFamily="patrick" size="xxl" weight="bold" style={{ textAlign: 'center', marginBottom: 32 }}>
        Kaizen 改善
      </Text>
      <Text size="lg" color="textSecondary" style={{ textAlign: 'center', marginBottom: 48 }}>
        Welcome to your journey of continuous improvement
      </Text>

      <Button
        title="Get Started"
        onPress={() => console.log('Navigate to Progress')}
        style={{ marginTop: 32 }}
      />
    </Box>
  );
};