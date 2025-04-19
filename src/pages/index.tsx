import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar} from 'react-native';
import Login from './Auth/Login';
import Reset from './Auth/Reset';
import Forgot from './Auth/Forgot';
import Verification from './Auth/Verification';
import MainNavigation from '../MainStackNavigation';
import SignUp from './Auth/SignUp';
import OfficesLog from './Offices';
import {useAuth} from '../hooks/useAuth';
import {authActions} from '../store/slices/auth.slice';
import {checkPinDate, getUserFromStorage} from '../utils/helpers';
import {useDispatch} from 'react-redux';
import {checkLoginDate} from '../utils/helpers';
import Begin from './Begin';
import TarifMain from './TarifMain';
import PinCodeScreen from './PinCode';
import PinSetupScreen from './RePinCode';
import PinSessionMonitor from './PinSessionMonitor';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PIN_KEY, PIN_KEY_DATE} from '../utils/consts';

const Stack = createNativeStackNavigator();

export default function Main() {
  const [loading, setLoading] = useState(true);
  const [canCreatePin, setCanCreatePin] = useState(true);
  const [pinSessionValid, setPinSessionValid] = useState(false);
  const [appInitialized, setAppInitialized] = useState<boolean>(false);
  const dispatch = useDispatch();
  const user = useAuth();

  useEffect(() => {
    const initApp = async () => {
      // Load user first
      const savedUser = await getUserFromStorage();
      const isLoggedIn = await checkLoginDate();

      if (savedUser && isLoggedIn) {
        dispatch(authActions.saveUser(savedUser));
      } else {
        dispatch(authActions.logout());
      }

      // Then check for PIN existence and session validity
      const pinExists = (await AsyncStorage.getItem(PIN_KEY)) !== null;
      const isPinSessionValid = await checkPinDate();

      setCanCreatePin(!pinExists);
      setPinSessionValid(isPinSessionValid);

      // Done loading
      setLoading(false);
      setAppInitialized(true);
    };

    initApp();
  }, [dispatch]);

  // Determine initial route only after loading is complete
  let initialRoute = 'Begin';

  if (user) {
    // If PIN doesn't exist, go to setup
    if (canCreatePin) {
      initialRoute = 'PinSetupScreen';
    }
    // If PIN exists but session is valid, skip PIN entry
    // else if (pinSessionValid) {
    //   initialRoute = 'MainNavigation';
    // }
    // // If PIN exists but session expired, require PIN entry
    else {
      initialRoute = 'PinCodeScreen';
    }
  }

  console.log('Final initialRoute:', initialRoute);

  if (loading || !appInitialized) {
    return null;
  }

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <NavigationContainer>
        {user && <PinSessionMonitor />}
        <Stack.Navigator initialRouteName={initialRoute}>
          <Stack.Screen
            options={{headerShown: false}}
            name="Begin"
            component={Begin}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="PinCodeScreen"
            component={PinCodeScreen}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="PinSetupScreen"
            component={PinSetupScreen}
          />
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
            name="Reset"
            component={Reset}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="Forgot"
            component={Forgot}
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
          <Stack.Screen
            options={{headerShown: false}}
            name="TarifMain"
            component={TarifMain}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
