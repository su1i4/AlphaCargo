import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './Login';
import ChangeSignIn from './Login/ChangeSignIn';
import Verification from './Login/Verification';
import MainNavigation from '../MainStackNavigation';
import Profile from '../screens/Profile';

const Stack = createNativeStackNavigator();


export default function Main(){
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
            name="ChangeSignIn"
            component={ChangeSignIn}
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
            name="Profile"
            component={Profile}
          />
        </Stack.Navigator>
      </NavigationContainer>
    )
}