import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { Text } from './Text';

interface ChartData {
  category: string;
  hours: number;
  color: string;
}

interface BarChartProps {
  data: ChartData[];
}

export const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const { theme } = useTheme();
  const [selectedPeriod, setSelectedPeriod] = useState('1 Week');
  
  const periods = ['1 Day', '1 Week', '1 Month'];
  const maxHours = Math.max(...data.map(d => d.hours));

  return (
    <View
      style={{
        backgroundColor: theme.colors.surface,
        borderRadius: 12,
        padding: theme.spacing.lg,
      }}
    >
      <Text size="lg" weight="bold" style={{ marginBottom: theme.spacing.md }}>
        Time by Category
      </Text>
      
      {/* Period Selector */}
      <View style={{ flexDirection: 'row', marginBottom: theme.spacing.lg }}>
        {periods.map((period) => (
          <TouchableOpacity
            key={period}
            onPress={() => setSelectedPeriod(period)}
            style={{
              paddingHorizontal: theme.spacing.md,
              paddingVertical: theme.spacing.sm,
              borderRadius: 8,
              backgroundColor: selectedPeriod === period ? theme.colors.primary : 'transparent',
              marginRight: theme.spacing.sm,
            }}
          >
            <Text
              size="sm"
              color={selectedPeriod === period ? 'background' : 'textSecondary'}
            >
              {period}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Chart */}
      <View style={{ height: 200, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-around' }}>
        {data.map((item, index) => {
          const barHeight = (item.hours / maxHours) * 160;
          return (
            <View key={index} style={{ alignItems: 'center', flex: 1 }}>
              <Text size="sm" color="textSecondary" style={{ marginBottom: 4 }}>
                {item.hours}h
              </Text>
              <View
                style={{
                  width: 40,
                  height: barHeight,
                  backgroundColor: item.color,
                  borderRadius: 4,
                  marginBottom: 8,
                }}
              />
              <Text size="sm" color="text" style={{ textAlign: 'center' }}>
                {item.category}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};