import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { Text } from './Text';

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
  const { theme } = useTheme();
  
  const buttonStyle = {
    backgroundColor: variant === 'primary' ? theme.colors.primary : theme.colors.secondary,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: 32,
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