import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '../models/rootStackParamList';
import {useAppSelector} from '../RTK/store/reduxHooks';

import HomeScreen from '../screens/HomeScreen';
import VisionCamera from '../screens/VisionCamera';
import AccountType from '../screens/Auth/AccountType/AccountType';
import Login from '../screens/Auth/Login';
import Identification from '../screens/Identification'

function RootStack() {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);
  const token = useAppSelector(state => state.token.jwt);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'AccountType'}
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
          <>
            <Stack.Screen name="AccountType" component={AccountType} />
            <Stack.Screen name="Login" component={Login} />
          </>
        ) : (
          <>
            <Stack.Screen
              options={{headerTitle: 'Account Type'}}
              name="AccountType"
              component={AccountType}
            />
            <Stack.Screen name="Login" component={Login} />
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
            <Stack.Screen
              name="Identification"
              options={{headerTitle: 'Identification'}}
              component={Identification}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default RootStack;
