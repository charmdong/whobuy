import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Main from './src';
import RecentInput from './src/components/Game/Recent/RecentInput';
import Topbar from './src/components/Topbar';
import Recent from './src/components/Game/Recent/Recent';

const Stack = createNativeStackNavigator();

export default function App() {
  const handleOnPressTitle = (): void => {
    alert("Let's go to Home!");
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{
          header: () => (
            <Topbar title="WHOBUY" onPressTitle={handleOnPressTitle} />
          ),
        }}
      >
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="RecentInput" component={RecentInput} />
        <Stack.Screen name="Recent" component={Recent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
