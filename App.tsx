import React from 'react';
import { AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { RootNavigator } from './src/navigation/RootNavigator';
import { ScheduleProvider } from './src/context/ScheduleContext';
import { ThemeProvider } from './src/theme/ThemeContext';

function App() {
  const [fontsLoaded] = useFonts({
    'PatrickHand-Regular': require('./assets/fonts/PatrickHand-Regular.ttf'),
    'ShadowsIntoLightTwo-Regular': require('./assets/fonts/ShadowsIntoLightTwo-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <ScheduleProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <RootNavigator />
        </NavigationContainer>
      </ScheduleProvider>
    </ThemeProvider>
  );
}

AppRegistry.registerComponent('main', () => App);

export default App;