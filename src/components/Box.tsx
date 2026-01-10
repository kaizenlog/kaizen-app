import React from 'react';
import { View, ViewProps, ViewStyle } from 'react-native';
import { colors, spacing } from '../theme';

interface BoxProps extends ViewProps {
  padding?: keyof typeof spacing;
  margin?: keyof typeof spacing;
  backgroundColor?: keyof typeof colors;
}

export const Box: React.FC<BoxProps> = ({
  padding,
  margin,
  backgroundColor,
  style,
  ...props
}) => {
  const boxStyle: ViewStyle = {
    ...(padding && { padding: spacing[padding] }),
    ...(margin && { margin: spacing[margin] }),
    ...(backgroundColor && { backgroundColor: colors[backgroundColor] }),
  };

  return <View style={[boxStyle, style]} {...props} />;
};