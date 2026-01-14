import React, { useState } from 'react';
import { View, TouchableOpacity, Modal, FlatList } from 'react-native';
import { Text } from './Text';
import { useTheme } from '../theme/ThemeContext';

interface DropdownProps {
  label: string;
  value: string;
  options: { label: string; value: string }[];
  onSelect: (value: string) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({ label, value, options, onSelect }) => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <View style={{ marginBottom: theme.spacing.md }}>
      <Text size="md" weight="medium" style={{ marginBottom: theme.spacing.sm }}>
        {label}
      </Text>
      
      <TouchableOpacity
        onPress={() => setIsOpen(true)}
        style={{
          borderWidth: 1,
          borderColor: theme.colors.border,
          borderRadius: 8,
          padding: theme.spacing.md,
          backgroundColor: theme.colors.surface,
        }}
      >
        <Text size="md" color={selectedOption ? 'text' : 'textSecondary'}>
          {selectedOption?.label || 'Select...'}
        </Text>
      </TouchableOpacity>

      <Modal visible={isOpen} transparent animationType="fade">
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            padding: theme.spacing.lg,
          }}
          onPress={() => setIsOpen(false)}
        >
          <View
            style={{
              backgroundColor: theme.colors.surface,
              borderRadius: 12,
              maxHeight: 300,
            }}
          >
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{
                    padding: theme.spacing.md,
                    borderBottomWidth: 1,
                    borderBottomColor: theme.colors.border,
                  }}
                  onPress={() => {
                    onSelect(item.value);
                    setIsOpen(false);
                  }}
                >
                  <Text size="md">{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};