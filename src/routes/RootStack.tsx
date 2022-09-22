import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '../models/rootStackParamList';
import {useAppSelector} from '../RTK/store/reduxHooks';

import Login from '../screens/Auth/Login';
import HomeScreen from '../screens/HomeScreen';
import VisionCamera from '../components/VisionCamera';

function RootStack() {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);
  const token = useAppSelector(state => state.token.jwt);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'Login'}
        screenOptions={{
          headerShown: false,
        }}>
        {!isLoggedIn && token === '' ? (
          <Stack.Screen name="Login" component={Login} />
        ) : (
          <>
            <Stack.Screen
              options={{
                headerTitle: 'NomadPay',
                headerShown: true,
                gestureEnabled: false,
                headerLeft: () => null,
                headerBackVisible: false,
                headerStyle: {
                  backgroundColor: '#F5FFFA',
                },
              }}
              name="HomeScreen"
              component={HomeScreen}
            />
            <Stack.Screen
              name="VisionCamera"
              options={{
                headerTitle: 'VisionCamera',
                headerShown: false,
                gestureEnabled: false,
                headerLeft: () => null,
                headerBackVisible: false,
                headerStyle: {
                  backgroundColor: '#F5FFFA',
                },
              }}
              component={VisionCamera}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default RootStack;
