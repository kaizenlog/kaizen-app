import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { Text } from './Text';

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle }) => {
  const { theme } = useTheme();

  return (
    <View
      style={{
        backgroundColor: theme.colors.surface,
        borderRadius: 12,
        padding: theme.spacing.md,
        flex: 1,
        alignItems: 'center',
        marginHorizontal: theme.spacing.xs,
      }}
    >
      <Text size="sm" color="textSecondary" style={{ marginBottom: 4 }}>
        {title}
      </Text>
      <Text size="xl" weight="bold" color="primary">
        {value}
      </Text>
      {subtitle && (
        <Text size="xs" color="textSecondary">
          {subtitle}
        </Text>
      )}
    </View>
  );
};