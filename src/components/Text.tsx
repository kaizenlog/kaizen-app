import React from 'react';
import { Text as RNText, TextProps as RNTextProps, TextStyle } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

interface TextProps extends RNTextProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'primary' | 'secondary' | 'background' | 'surface' | 'text' | 'textSecondary' | 'border' | 'error' | 'success' | 'warning';
  fontFamily?: 'regular' | 'patrick' | 'shadows';
}

export const Text: React.FC<TextProps> = ({
  size = 'md',
  weight = 'normal',
  color = 'text',
  fontFamily = 'regular',
  style,
  ...props
}) => {
  const { theme } = useTheme();
  
  const textStyle: TextStyle = {
    fontSize: theme.typography.fontSize[size],
    fontWeight: theme.typography.fontWeight[weight],
    color: theme.colors[color],
    fontFamily: theme.typography.fontFamily[fontFamily],
  };

  return <RNText style={[textStyle, style]} {...props} />;
};