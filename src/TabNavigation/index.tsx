import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text, Alert} from 'react-native';
import WatchOrder from '../pages/WatchOrder';
import Order from '../pages/Map';
import Send from '../pages/Send';
import Alpha from '../pages/Alpha';
import LupaIcon from '../assets/icons/LupaIcon';
import CargoIcon from '../assets/icons/CargoIcon';
import GeoIcon from '../assets/icons/GeoIcon';
import BurgerIcon from '../assets/icons/BurgerIcon';
import {useDispatch} from 'react-redux';
import {useAuth} from '../hooks/useAuth';
import {getUserFromStorage, checkLoginDate} from '../utils/helpers';
import {authActions} from '../store/slices/auth.slice';
import {useNavigation} from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export default function TabNavigation({route}: any) {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const user = useAuth();

  const navigation: any = useNavigation();

  useEffect(() => {
    const loadUser = async () => {
      const savedUser = await getUserFromStorage();
      const isLoggedIn = await checkLoginDate();
      if (savedUser && isLoggedIn) {
        dispatch(authActions.saveUser(savedUser));
        setIsLoggedIn(true);
      } else {
        dispatch(authActions.logout());
        setIsLoggedIn(false);
      }
      setLoading(false);
    };
    loadUser();
  }, [dispatch]);

  // Show login prompt if not logged in
  const handleTabPress = (tabName: any) => {
    if (!isLoggedIn) {
      Alert.alert(
        'Требуется вход',
        `Для доступа к вкладке необходимо войти в систему.`,
        [
          {
            text: 'Отмена',
            style: 'cancel',
          },
          {
            text: 'Войти',
            onPress: () => navigation.navigate('Begin'),
          },
        ],
      );
    }
  };

  if (loading) {
    return null; // Or a loading spinner
  }

  return (
    <Tab.Navigator
      initialRouteName="WatchOrder"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
      }}>
      <Tab.Screen
        name="WatchOrder"
        component={WatchOrder}
        options={{
          tabBarLabel: ({focused}) => (
            <Text style={{color: focused ? '#94C325' : 'gray', fontSize: 11}}>
              Главная
            </Text>
          ),
          tabBarIcon: ({focused}) => <LupaIcon active={focused} size={24} />,
        }}
      />
      <Tab.Screen
        name="Send"
        component={Send}
        listeners={{
          tabPress: e => {
            if (!isLoggedIn) {
              e.preventDefault(); // Prevent tab navigation
              handleTabPress('Send');
            }
          },
        }}
        options={{
          tabBarLabel: ({focused}) => (
            <Text style={{color: focused ? '#94C325' : 'gray', fontSize: 11}}>
              Мои посылки
            </Text>
          ),
          tabBarIcon: ({focused}) => <CargoIcon active={focused} size={24} />,
        }}
      />
      <Tab.Screen
        name="Order"
        component={Order}
        options={{
          tabBarLabel: ({focused}) => (
            <Text style={{color: focused ? '#94C325' : 'gray', fontSize: 11}}>
              Пункты
            </Text>
          ),
          tabBarIcon: ({focused}) => <GeoIcon active={focused} size={24} />,
        }}
      />
      <Tab.Screen
        name="Alpha"
        component={Alpha}
        listeners={{
          tabPress: e => {
            if (!isLoggedIn) {
              e.preventDefault(); // Prevent tab navigation
              handleTabPress('Alpha');
            }
          },
        }}
        options={{
          tabBarLabel: ({focused}) => (
            <Text style={{color: focused ? '#94C325' : 'gray', fontSize: 11}}>
              Мой Альфа
            </Text>
          ),
          tabBarIcon: ({focused}) => <BurgerIcon active={focused} size={24} />,
        }}
      />
    </Tab.Navigator>
  );
}
