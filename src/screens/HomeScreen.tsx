import React from 'react';
import { Box } from '../components/Box';
import { Text } from '../components/Text';
import { Button } from '../components/Button';
import { Dropdown } from '../components/Dropdown';
import { useSchedule } from '../context/ScheduleContext';
import { spacing } from '../theme';

export const HomeScreen: React.FC = () => {
  const { config, updateConfig } = useSchedule();

  const timeOptions = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return { label: `${hour}:00`, value: `${hour}:00` };
  });

  const intervalOptions = [
    { label: '15 minutes', value: '15' },
    { label: '30 minutes', value: '30' },
    { label: '45 minutes', value: '45' },
    { label: '60 minutes', value: '60' },
  ];

  const handleUpdateConfig = () => {
    console.log('Schedule updated:', config);
  };

  return (
    <Box backgroundColor="background" padding="lg" style={{ flex: 1 }}>
      <Text fontFamily="patrick" size="xxl" weight="bold" style={{ textAlign: 'center', marginBottom: 48, marginTop: 32 }}>
        Kaizen 改善
      </Text>

      <Text fontFamily="patrick" size="lg" style={{ textAlign: 'center', marginBottom: 48 }}>
        Configure your tracking schedule
      </Text>

      <Dropdown
        label="Start Time"
        value={config.startTime}
        options={timeOptions}
        onSelect={(value) => updateConfig({ ...config, startTime: value })}
      />

      <Dropdown
        label="End Time"
        value={config.endTime}
        options={timeOptions}
        onSelect={(value) => updateConfig({ ...config, endTime: value })}
      />

      <Dropdown
        label="Interval"
        value={config.interval.toString()}
        options={intervalOptions}
        onSelect={(value) => updateConfig({ ...config, interval: parseInt(value) })}
      />

      <Button
        title="Update Schedule"
        onPress={handleUpdateConfig}
        style={{ marginTop: spacing.lg }}
      />
    </Box>
  );
};