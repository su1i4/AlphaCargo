import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from './src/pages/Login';
import ChangeSignIn from './src/pages/Login/ChangeSignIn';
import Verification from './src/pages/Login/Verification';
import Profile from './src/screens/Profile';
import TabNavigation from './src/TabNavigation';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {

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
          name="TabNavigation"
          component={TabNavigation}
        /> 
        <Stack.Screen
          options={{headerShown: false}}
          name="Profile"
          component={Profile}
        /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({

// });

export default App;
