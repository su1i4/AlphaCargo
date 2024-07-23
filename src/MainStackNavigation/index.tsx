import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigation from '../TabNavigation';
import { Loyalty } from '../screens/Loyalty';

const MainStack = createNativeStackNavigator();

export default function MainNavigation() {
    return (
      <MainStack.Navigator screenOptions={{ headerShown: false }}>
        <MainStack.Screen name="TabNavigation" component={TabNavigation} />
        <MainStack.Screen name="Loyalty" component={Loyalty} />
      </MainStack.Navigator>
    );
  }