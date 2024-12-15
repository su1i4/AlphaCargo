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
import Vlogs from '../screens/Vlogs';
import Questions from '../screens/Questions';
import Franshiza from '../screens/Franshiza';
import Help from '../screens/Help';
import Payment from '../screens/Payment';
import Gruz from '../screens/Gruz';

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
      <MainStack.Screen name="Vlogs" component={Vlogs} />
      <MainStack.Screen name="Questions" component={Questions} />
      <MainStack.Screen name="Help" component={Help} />
      <MainStack.Screen name="Franshiza" component={Franshiza} />
      <MainStack.Screen name="Payment" component={Payment} />
      <MainStack.Screen name="Gruz" component={Gruz} />
    </MainStack.Navigator>
  );
}
