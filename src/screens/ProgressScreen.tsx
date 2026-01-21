import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Box } from '../components/Box';
import { Text } from '../components/Text';
import { StatCard } from '../components/StatCard';
import { BarChart } from '../components/BarChart';
import { useTheme } from '../theme/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

export const ProgressScreen: React.FC = () => {
  const { theme, isDark, toggleTheme } = useTheme();
  const [streak] = useState(7); // Dummy data

  // Dummy chart data
  const chartData = [
    { category: 'Work', hours: 25, color: theme.colors.primary },
    { category: 'Study', hours: 18, color: theme.colors.secondary },
    { category: 'Gym', hours: 8, color: '#4ADE80' },
    { category: 'Other', hours: 12, color: '#FBBF24' },
  ];

  return (
    <Box backgroundColor="background" style={{ flex: 1 }}>
      <TouchableOpacity 
        onPress={toggleTheme}
        style={{ position: 'absolute', top: 40, right: 20, zIndex: 10 }}
      >
        <Ionicons 
          name={isDark ? 'sunny' : 'moon'} 
          size={24} 
          color={theme.colors.text} 
        />
      </TouchableOpacity>
      
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: theme.spacing.lg }}>
        <Text fontFamily="patrick" size="xxl" weight="bold" style={{ textAlign: 'center', marginBottom: 32, marginTop: 32 }}>
          Your Progress
        </Text>

        {/* Streak Section */}
        <View style={{ 
          flexDirection: 'row', 
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: theme.colors.surface,
          borderRadius: 12,
          padding: theme.spacing.lg,
          marginBottom: theme.spacing.lg
        }}>
          <Text size="lg" color="textSecondary" style={{ marginRight: 8 }}>
            Current Streak:
          </Text>
          <Text fontFamily="patrick" size="xl" weight="bold" color="primary">
            {streak} days
          </Text>
        </View>

        {/* Stats Cards */}
        <View style={{ flexDirection: 'row', marginBottom: theme.spacing.lg }}>
          <StatCard title="Total Hours" value="63" subtitle="this week" />
          <StatCard title="Best Day" value="12h" subtitle="Monday" />
          <StatCard title="Avg/Day" value="9h" subtitle="last 7 days" />
        </View>

        {/* Chart */}
        <BarChart data={chartData} />
      </ScrollView>
    </Box>
  );
};