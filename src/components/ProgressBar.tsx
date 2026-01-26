import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { Text } from './Text';

interface ProgressBarProps {
  current: number;
  total: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const { theme } = useTheme();
  const percentage = total > 0 ? (current / total) * 100 : 0;

  return (
    <View style={{ marginBottom: theme.spacing.lg }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: theme.spacing.sm }}>
        <Text size="sm" color="textSecondary">
          Progress
        </Text>
        <Text size="sm" color="textSecondary">
          {current}/{total}
        </Text>
      </View>
      <View
        style={{
          height: 8,
          backgroundColor: theme.colors.border,
          borderRadius: 4,
          overflow: 'hidden',
        }}
      >
        <View
          style={{
            height: '100%',
            width: `${percentage}%`,
            backgroundColor: theme.colors.primary,
            borderRadius: 4,
          }}
        />
      </View>
    </View>
  );
};