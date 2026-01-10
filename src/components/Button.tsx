import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Text } from './Text';
import { colors, spacing } from '../theme';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  style,
  ...props
}) => {
  const buttonStyle = {
    backgroundColor: variant === 'primary' ? colors.primary : colors.secondary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 8,
    alignItems: 'center' as const,
  };

  return (
    <TouchableOpacity style={[buttonStyle, style]} {...props}>
      <Text color="background" weight="medium">
        {title}
      </Text>
    </TouchableOpacity>
  );
};