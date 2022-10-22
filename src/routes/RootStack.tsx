import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '../models/rootStackParamList';
import {useAppSelector} from '../RTK/store/reduxHooks';

import Login from '../screens/Auth/Login';
import HomeScreen from '../screens/Identification';
import VisionCamera from '../screens/VisionCamera';
import UserType from '../screens/UserType';

function RootStack() {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);
  const token = useAppSelector(state => state.token.jwt);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'UserType'}
        screenOptions={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerBackVisible: true,
          headerBackTitleVisible: false,
          animation: 'slide_from_right',
          contentStyle: {
            backgroundColor: '#F5FFFA',
          },
          headerStyle: {
            backgroundColor: '#F5FFFA',
          },
        }}>
        {!isLoggedIn && token === '' ? (
          <Stack.Screen name="UserType" component={UserType} />
        ) : (
          <>
            <Stack.Screen
              options={{headerTitle: 'User Type'}}
              name="UserType"
              component={UserType}
            />
            <Stack.Screen
              options={{headerTitle: 'NomadPay'}}
              name="HomeScreen"
              component={HomeScreen}
            />
            <Stack.Screen
              name="VisionCamera"
              options={{headerTitle: 'VisionCamera'}}
              component={VisionCamera}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default RootStack;
