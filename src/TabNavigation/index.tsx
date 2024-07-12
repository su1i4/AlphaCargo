import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text} from 'react-native';
import WatchOrder from '../pages/WatchOrder';
import Order from '../pages/Order';
import Send from '../pages/Send';
import Alpha from '../pages/Alpha';
import LupaIcon from '../assets/icons/LupaIcon';
import CargoIcon from '../assets/icons/CargoIcon';
import GeoIcon from '../assets/icons/GeoIcon';
import BurgerIcon from '../assets/icons/BurgerIcon';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
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
        options={({route}) => ({
          tabBarLabel: ({focused}) => (
            <Text style={{color: focused ? '#94C325' : 'gray', fontSize: 11}}>
              Отследить
            </Text>
          ),
          tabBarIcon: ({color, size, focused}) => (
            <LupaIcon active={focused} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name="Send"
        component={Send}
        options={({route}) => ({
          tabBarLabel: ({focused}) => (
            <Text style={{color: focused ? '#94C325' : 'gray', fontSize: 11}}>
              Отправления
            </Text>
          ),
          tabBarIcon: ({color, size, focused}) => (
            <CargoIcon active={focused} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name="Order"
        component={Order}
        options={({route}) => ({
          tabBarLabel: ({focused}) => (
            <Text style={{color: focused ? '#94C325' : 'gray', fontSize: 11}}>
              Пункты
            </Text>
          ),
          tabBarIcon: ({color, size, focused}) => (
            <GeoIcon active={focused} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name="Alpha"
        component={Alpha}
        options={({route}) => ({
          tabBarLabel: ({focused}) => (
            <Text style={{color: focused ? '#94C325' : 'gray', fontSize: 11}}>
              Мой Альфа
            </Text>
          ),
          tabBarIcon: ({color, size, focused}) => (
            <BurgerIcon active={focused} size={size} />
          ),
        })}
      />
    </Tab.Navigator>
  );
}
