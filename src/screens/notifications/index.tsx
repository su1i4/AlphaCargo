import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Header from '../../screens/Header';
import LogoutIcon from '../../assets/icons/LogoutIcon';
import {useNavigation} from '@react-navigation/native';
import BellIcon from '../../assets/icons/BellIcon';
import { useGetNotificationsQuery } from '../../services/base.service';

export const Notifications = () => {
  const navigation: any = useNavigation();
  const {data} = useGetNotificationsQuery()

  console.log(data, 'this is data')

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        id="Notifications"
        text="Уведомления"
        Right={LogoutIcon}
        Left={BellIcon}
        funcLeft={() => navigation.navigate('Notifications')}
        func={() => navigation.goBack()}
      />
      <ScrollView style={styles.scrollView}>
        <View style={styles.Wrapper}>
          {[].map((item: any, index: number) => (
            <View key={index} style={styles.container}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '600',
                  color: '#02447F',
                  marginVertical: 5,
                }}>
                {item.name}
              </Text>
              <View
                style={{
                  width: '100%',
                  height: 1,
                  backgroundColor: '#27457C4A',
                  marginVertical: 13,
                }}
              />
              <View>
                <Text style={{color: '#8C8C8C', fontSize: 13}}>
                  дата: {item.date}
                </Text>
                <Text style={{color: '#8C8C8C', fontSize: 13}}>
                  статус: {item.status}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  Wrapper: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    alignItems: 'center',
  },
  bigText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '600',
  },
  smallText: {
    color: '#8C8C8C',
    fontSize: 13,
    fontWeight: '400',
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    width: '100%',
  },
});
