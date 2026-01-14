import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { Dropdown } from './Dropdown';
import { Text } from './Text';

interface CardProps {
  time: string;
  description: string;
  category?: string;
  onDescriptionChange: (newDescription: string) => void;
  onCategoryChange: (newCategory: string) => void;
}

export const Card: React.FC<CardProps> = ({
  time,
  description,
  category = 'None',
  onDescriptionChange,
  onCategoryChange
}) => {
  const { theme } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [tempDescription, setTempDescription] = useState(description);

  const categoryOptions = [
    { label: 'None', value: 'None' },
    { label: 'Work', value: 'Work' },
    { label: 'Study', value: 'Study' },
    { label: 'Gym', value: 'Gym' }
  ];

  const cardStyle: ViewStyle = {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    padding: theme.spacing.md,
    marginHorizontal: theme.spacing.xs,
    marginVertical: theme.spacing.xs,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  };

  const dividerStyle: ViewStyle = {
    width: 1,
    height: 40,
    backgroundColor: theme.colors.border,
    marginHorizontal: theme.spacing.md,
  };

  const handleSave = () => {
    onDescriptionChange(tempDescription);
    setIsEditing(false);
  };

  return (
    <View style={cardStyle}>
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}
        onPress={() => setIsEditing(true)}
        disabled={isEditing}
      >
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
                fontFamily: theme.typography.fontFamily.patrick,
                fontSize: theme.typography.fontSize.lg,
                color: theme.colors.text,
                flex: 1,
              }}
              placeholder="Enter what you did"
              placeholderTextColor={theme.colors.textSecondary}
            />
          </View>
        ) : (
          <Text fontFamily="patrick" size="lg" color="text" style={{ flex: 1 }}>
            {description || 'Tap to add what you did...'}
          </Text>
        )}
      </TouchableOpacity>

      <View style={{ width: 100, marginLeft: theme.spacing.sm }}>
        <Dropdown
          label=""
          options={categoryOptions}
          value={category}
          onSelect={onCategoryChange}
        />
      </View>
    </View>
  );
};