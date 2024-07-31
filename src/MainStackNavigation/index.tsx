import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Loyalty} from '../screens/Loyalty';
import {Points} from '../screens/Points';
import {Notifications} from '../screens/notifications';
import TabNavigation from '../TabNavigation';
import Profile from '../screens/Profile';
import CalcPrice from '../screens/CalcPrice';

const MainStack = createNativeStackNavigator();

export default function MainNavigation() {
  return (
    <MainStack.Navigator screenOptions={{headerShown: false}}>
      <MainStack.Screen name="TabNavigation" component={TabNavigation} />
      <MainStack.Screen name="Loyalty" component={Loyalty} />
      <MainStack.Screen name="Points" component={Points} />
      <MainStack.Screen name="Profile" component={Profile} />
      <MainStack.Screen name="CalcPrice" component={CalcPrice} />
      <MainStack.Screen name="Notifications" component={Notifications} />
    </MainStack.Navigator>
  );
}
