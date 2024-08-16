import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Loyalty} from '../screens/Loyalty';
import {Points} from '../screens/Points';
import {Notifications} from '../screens/notifications';
import TabNavigation from '../TabNavigation';
import Profile from '../screens/Profile';
import CalcPrice from '../screens/CalcPrice';
import Bonus from '../screens/BonusPage';
import Tasks from '../screens/Tasks';
import Reward from '../screens/Reward';
import Tarif from '../screens/Tarif';

const MainStack = createNativeStackNavigator();

export default function MainNavigation() {
  return (
    <MainStack.Navigator screenOptions={{headerShown: false}}>
      <MainStack.Screen name="TabNavigation" component={TabNavigation} />
      <MainStack.Screen name="Loyalty" component={Loyalty} />
      <MainStack.Screen name="Points" component={Points} />
      <MainStack.Screen name="Profile" component={Profile} />
      <MainStack.Screen name="CalcPrice" component={CalcPrice} />
      <MainStack.Screen name="Tarif" component={Tarif} />
      <MainStack.Screen name="Notifications" component={Notifications} />
      <MainStack.Screen name="Bonus" component={Bonus} />
      <MainStack.Screen name="Reward" component={Reward} />
      <MainStack.Screen name="Tasks" component={Tasks} />
    </MainStack.Navigator>
  );
}
