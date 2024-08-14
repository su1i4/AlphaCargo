import React, {useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {useAuth} from '../../hooks/useAuth';
import { getUserFromStorage } from '../../utils/helpers';

const SplashScreen = ({navigation}: any) => {
    
  const user = getUserFromStorage()

  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red', // или любой другой цвет фона
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default SplashScreen;
