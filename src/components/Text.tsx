import React from 'react';
import { Text as RNText, TextProps as RNTextProps, TextStyle } from 'react-native';
import { colors, typography } from '../theme';

interface TextProps extends RNTextProps {
  size?: keyof typeof typography.fontSize;
  weight?: keyof typeof typography.fontWeight;
  color?: keyof typeof colors;
}

export const Text: React.FC<TextProps> = ({
  size = 'md',
  weight = 'normal',
  color = 'text',
  style,
  ...props
}) => {
  const textStyle: TextStyle = {
    fontSize: typography.fontSize[size],
    fontWeight: typography.fontWeight[weight],
    color: colors[color],
  };

  return <RNText style={[textStyle, style]} {...props} />;
};