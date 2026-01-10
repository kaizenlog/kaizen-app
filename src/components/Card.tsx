import React from 'react';
import { View, ViewStyle } from 'react-native';
import { Text } from './Text';
import { colors, spacing } from '../theme';

interface CardProps {
  time: string;
  description: string;
}

export const Card: React.FC<CardProps> = ({ time, description }) => {
  const cardStyle: ViewStyle = {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: spacing.lg,
    marginHorizontal: spacing.md,
    marginVertical: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  };

  const dividerStyle: ViewStyle = {
    width: 1,
    height: 40,
    backgroundColor: colors.border,
    marginHorizontal: spacing.lg,
  };

  return (
    <View style={cardStyle}>
      <Text size="lg" weight="medium" color="primary" style={{ minWidth: 60 }}>
        {time}
      </Text>
      <View style={dividerStyle} />
      <Text size="md" color="text" style={{ flex: 1 }}>
        {description}
      </Text>
    </View>
  );
};