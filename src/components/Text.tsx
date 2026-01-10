import React from 'react';
import { Text as RNText, TextProps as RNTextProps, TextStyle } from 'react-native';
import { colors, typography } from '../theme';

interface TextProps extends RNTextProps {
  size?: keyof typeof typography.fontSize;
  weight?: keyof typeof typography.fontWeight;
  color?: keyof typeof colors;
  fontFamily?: keyof typeof typography.fontFamily;
}

export const Text: React.FC<TextProps> = ({
  size = 'md',
  weight = 'normal',
  color = 'text',
  fontFamily = 'regular',
  style,
  ...props
}) => {
  const textStyle: TextStyle = {
    fontSize: typography.fontSize[size],
    fontWeight: typography.fontWeight[weight],
    color: colors[color],
    fontFamily: typography.fontFamily[fontFamily],
  };

  return <RNText style={[textStyle, style]} {...props} />;
};