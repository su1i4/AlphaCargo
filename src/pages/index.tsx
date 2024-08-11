import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from './Auth/Login';
import Verification from './Auth/Verification';
import MainNavigation from '../MainStackNavigation';
import SignUp from './Auth/SignUp';
import OfficesLog from './Offices';

const Stack = createNativeStackNavigator();

export default function Main() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
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
