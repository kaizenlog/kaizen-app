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

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    zIndex: isDropdownOpen ? 1000 : 1,
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
      <Text size="lg" weight="medium" color="primary" style={{ minWidth: 60 }}>
        {time}
      </Text>
      <View style={dividerStyle} />
      
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => setIsEditing(true)}
        disabled={isEditing}
      >
        {isEditing ? (
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
            }}
            placeholder="Enter what you did"
            placeholderTextColor={theme.colors.textSecondary}
          />
        ) : (
          <Text fontFamily="patrick" size="lg" color="text">
            {description || 'Tap to add what you did...'}
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setIsDropdownOpen(!isDropdownOpen)}
        style={{
          borderWidth: 1,
          borderColor: theme.colors.secondary,
          borderRadius: 6,
          paddingHorizontal: theme.spacing.sm,
          paddingVertical: theme.spacing.xs,
          marginLeft: theme.spacing.sm,
        }}
      >
        <Text size="sm" color="secondary">
          {category}
        </Text>
      </TouchableOpacity>

      {isDropdownOpen && (
        <View
          style={{
            position: 'absolute',
            right: theme.spacing.md,
            top: 60,
            backgroundColor: theme.colors.surface,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: theme.colors.border,
            zIndex: 2000,
            elevation: 10,
            minWidth: 120,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
          }}
        >
          {categoryOptions.map((option, index) => (
            <TouchableOpacity
              key={option.value}
              onPress={() => {
                onCategoryChange(option.value);
                setIsDropdownOpen(false);
              }}
              style={{
                padding: theme.spacing.md,
                borderBottomWidth: index < categoryOptions.length - 1 ? 1 : 0,
                borderBottomColor: theme.colors.border,
              }}
            >
              <Text size="md">{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};