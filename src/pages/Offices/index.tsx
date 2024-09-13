import React from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import Header from '../../screens/Header';
import SingleUser from '../../assets/icons/SingleUser';
import {useNavigation} from '@react-navigation/native';
import {useGetAllCitiesQuery} from '../../services/base.service';

export default function OfficesLog() {
  const {data = []} = useGetAllCitiesQuery();

  const navigation: any = useNavigation();

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header
        placeholder="Введите адрес"
        id="Orders"
        text="Пункты Альфа"
        Right={SingleUser}
        func={() => navigation.navigate('Profile')}
      />
      <View style={styles.container}>
       
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    position: 'relative',
  },
  map: {
    height: '100%',
    width: '100%',
  },
});
