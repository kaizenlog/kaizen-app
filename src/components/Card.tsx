import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View, ViewStyle } from 'react-native';
import { colors, spacing, typography } from '../theme';
import { Text } from './Text';

interface CardProps {
  time: string;
  description: string;
  onDescriptionChange: (newDescription: string) => void;
}

export const Card: React.FC<CardProps> = ({ time, description, onDescriptionChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempDescription, setTempDescription] = useState(description);

  const cardStyle: ViewStyle = {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: spacing.md,
    marginHorizontal: spacing.xs,
    marginVertical: spacing.xs,
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
    marginHorizontal: spacing.md,
  };

  const handleSave = () => {
    onDescriptionChange(tempDescription);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempDescription(description);
    setIsEditing(false);
  };

  return (
    <TouchableOpacity style={cardStyle} onPress={() => setIsEditing(true)} disabled={isEditing}>
      <Text size="lg" weight="medium" color="primary" style={{ minWidth: 60 }}>
        {time}
      </Text>
      <View style={dividerStyle} />
      {isEditing ? (
        <View style={{ flex: 1 }}>
          <TextInput
            value={tempDescription}
            onChangeText={setTempDescription}
            onBlur={handleSave}
            onSubmitEditing={handleSave}
            autoFocus
            multiline
            style={{
              fontFamily: typography.fontFamily.patrick,
              fontSize: typography.fontSize.lg,
              color: colors.text,
              flex: 1,
            }}
            placeholder="Enter what you did"
          />
        </View>
      ) : (
        <Text fontFamily="patrick" size="lg" color="text" style={{ flex: 1 }}>
          {description || 'Tap to add what you did...'}
        </Text>
      )}
    </TouchableOpacity>
  );
};