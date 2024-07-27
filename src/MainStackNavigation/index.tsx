import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigation from '../TabNavigation';
import { Loyalty } from '../screens/Loyalty';
import { Points } from '../screens/Points';
import Profile from '../screens/Profile';

const MainStack = createNativeStackNavigator();

export default function MainNavigation() {
    return (
      <MainStack.Navigator screenOptions={{ headerShown: false }}>
        <MainStack.Screen name="TabNavigation" component={TabNavigation} />
        <MainStack.Screen name="Loyalty" component={Loyalty} />
        <MainStack.Screen name="Points" component={Points} />
        <MainStack.Screen name="Profile" component={Profile} />
      </MainStack.Navigator>
    );
  }