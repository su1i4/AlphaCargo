import {useEffect, useState} from 'react';
import {AppState} from 'react-native';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {checkPinDate, getUserFromStorage} from '../../utils/helpers';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CHECK_INTERVAL = 10000;

const PinSessionMonitor = () => {
  const navigation: any = useNavigation();
  const isFocused = useIsFocused();
  const [appState, setAppState] = useState(AppState.currentState);

  const checkPinSession = async () => {
    try {
      const user = await getUserFromStorage();
      const isPinValid = await checkPinDate();

      if (
        !isPinValid &&
        user &&
        navigation.getCurrentRoute()?.name !== 'PinCodeScreen' &&
        navigation.getCurrentRoute()?.name !== 'PinSetupScreen' &&
        navigation.getCurrentRoute()?.name !== 'Begin'
      ) {
        console.log('PIN session expired, redirecting to PIN screen');
        navigation.reset({
          index: 0,
          routes: [{name: 'PinCodeScreen'}],
        });
      }
    } catch (error) {
      console.error('Error checking PIN session:', error);
    }
  };

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        console.log('App has come to the foreground, checking PIN session');
        checkPinSession();
      }
      setAppState(nextAppState);
    });

    return () => {
      subscription.remove();
    };
  }, [appState, navigation]);

  useEffect(() => {
    let intervalId: any;

    if (isFocused) {
      intervalId = setInterval(checkPinSession, CHECK_INTERVAL);
      console.log('Started PIN session monitoring interval');
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
        console.log('Cleared PIN session monitoring interval');
      }
    };
  }, [isFocused, navigation]);

  return null;
};

export default PinSessionMonitor;
