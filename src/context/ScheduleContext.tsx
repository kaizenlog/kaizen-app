import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ScheduleConfig {
  startTime: string;
  endTime: string;
  interval: number;
}

interface ScheduleContextType {
  config: ScheduleConfig;
  updateConfig: (config: ScheduleConfig) => void;
}

const ScheduleContext = createContext<ScheduleContextType | undefined>(undefined);

export const ScheduleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<ScheduleConfig>({
    startTime: '06:00',
    endTime: '23:00',
    interval: 30,
  });

  const updateConfig = (newConfig: ScheduleConfig) => {
    setConfig(newConfig);
  };

  return (
    <ScheduleContext.Provider value={{ config, updateConfig }}>
      {children}
    </ScheduleContext.Provider>
  );
};

export const useSchedule = () => {
  const context = useContext(ScheduleContext);
  if (!context) {
    throw new Error('useSchedule must be used within ScheduleProvider');
  }
  return context;
};