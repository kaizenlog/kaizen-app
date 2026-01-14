import React from 'react';
import { View, ViewProps, ViewStyle } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

interface BoxProps extends ViewProps {
  padding?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  margin?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  backgroundColor?: 'primary' | 'secondary' | 'background' | 'surface' | 'text' | 'textSecondary' | 'border' | 'error' | 'success' | 'warning';
}

export const Box: React.FC<BoxProps> = ({
  padding,
  margin,
  backgroundColor,
  style,
  ...props
}) => {
  const { theme } = useTheme();
  
  const boxStyle: ViewStyle = {
    ...(padding && { padding: theme.spacing[padding] }),
    ...(margin && { margin: theme.spacing[margin] }),
    ...(backgroundColor && { backgroundColor: theme.colors[backgroundColor] }),
  };

  return <View style={[boxStyle, style]} {...props} />;
};