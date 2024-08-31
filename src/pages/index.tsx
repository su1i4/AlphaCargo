import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './Auth/Login';
import Verification from './Auth/Verification';
import MainNavigation from '../MainStackNavigation';
import SignUp from './Auth/SignUp';
import OfficesLog from './Offices';
import {useAuth} from '../hooks/useAuth';
import {authActions} from '../store/slices/auth.slice';
import {getUserFromStorage} from '../utils/helpers';
import {useDispatch} from 'react-redux';
import {checkLoginDate} from '../utils/helpers';

const Stack = createNativeStackNavigator();

export default function Main() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const user = useAuth();

  useEffect(() => {
    const loadUser = async () => {
      const savedUser = await getUserFromStorage();
      const isLoggedIn = await checkLoginDate();

      if (savedUser && isLoggedIn) {
        dispatch(authActions.saveUser(savedUser));
      } else {
        dispatch(authActions.logout());
      }

      setLoading(false);
    };

    loadUser();
  }, [dispatch]);

  if (loading) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? 'MainNavigation' : 'Login'}>
        <Stack.Screen
          options={{headerShown: false}}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="SignUp"
          component={SignUp}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Verification"
          component={Verification}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="MainNavigation"
          component={MainNavigation}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="OfficesLog"
          component={OfficesLog}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
