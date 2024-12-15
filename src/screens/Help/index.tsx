import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Header from '../Header';
import Back from '../../assets/icons/Back';
import {useNavigation} from '@react-navigation/native';
import Mark from '../../assets/icons/support/mark';
import Chat from '../../assets/icons/support/chat';

const Help = () => {
  const navigation: any = useNavigation();

  return (
    <View style={{flex: 1}}>
      <Header
        Left={Back}
        funcLeft={() => navigation.navigate('Alpha')}
        id="questions"
        text="Поддержка"
      />
      <View style={styles.container}>
        <View style={styles.main}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Questions')}
            style={styles.wrap}>
            <Mark />
            <Text>Часто задаваемые вопросы</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.wrap, {paddingLeft: 4}]}>
            <Chat />
            <Text>Предложить функционал</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    padding: 20,
  },
  main: {
    width: '100%',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    borderRadius: 10,
    elevation: 4,
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 10,
    paddingVertical: 20,
    gap: 20,
  },
  wrap: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
});

export default Help;
