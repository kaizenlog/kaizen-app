import React, { useEffect, useState } from 'react';
import { Box } from '../components/Box';
import { Text } from '../components/Text';
import { calculateStreak } from '../database/entries';
import { useTheme } from '../theme/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

export const ProgressScreen: React.FC = () => {
  const [streak, setStreak] = useState(0);
  const { theme, isDark, toggleTheme } = useTheme();

  useEffect(() => {
    loadStreak();
  }, []);

  const loadStreak = async () => {
    try {
      const currentStreak = await calculateStreak();
      setStreak(currentStreak);
    } catch (error) {
      console.error('Failed to load streak:', error);
    }
  };

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
      
      <Text fontFamily="patrick" size="xxl" weight="bold" style={{ textAlign: 'center', marginBottom: 48, marginTop: 32 }}>
        Your Progress
      </Text>

      <Box backgroundColor="surface" padding="xl" style={{ borderRadius: 16, alignItems: 'center' }}>
        <Text size="md" color="textSecondary" style={{ marginBottom: 16 }}>
          Current Streak
        </Text>
        <Text fontFamily="patrick" size="xxl" weight="bold" color="primary" style={{ fontSize: 64 }}>
          {streak}
        </Text>
        <Text size="lg" color="textSecondary">
          {streak === 1 ? 'day' : 'days'}
        </Text>
      </Box>
    </Box>
  );
};