import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from '../utils/NavigationUtils';
import SplashCreen from '../features/auth/SplashCreen';
import MoodScanScreen from '../features/moodscan/MoodScanScreen';
import UserBottomTab from '../features/tabs/UserBottomTab';
import SharedTransition from '../features/tabs/SharedTransition';
const Stack = createNativeStackNavigator();
const Navigation: FC = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{
          headerShown: false,
          animation: 'fade',
        }}>
        <Stack.Screen name="SplashScreen" component={SplashCreen} />
        <Stack.Screen name="MoodScanner" component={MoodScanScreen} />
        <Stack.Screen name="UserBottomTab" component={SharedTransition} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
