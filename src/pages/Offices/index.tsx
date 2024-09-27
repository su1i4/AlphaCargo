import React from 'react';
import {StyleSheet, View} from 'react-native';
import Header from '../../screens/Header';
import SingleUser from '../../assets/icons/SingleUser';
import {useNavigation} from '@react-navigation/native';
import {useGetOfficesQuery} from '../../services/base.service';

export default function OfficesLog() {
  const {data = []} = useGetOfficesQuery()

  const navigation: any = useNavigation();

  console.log(data, 'offices lat and lang')

  return (
    <View style={styles.container}>
      <Header
        placeholder="Введите адрес"
        id="Orders"
        text="Пункты Альфа"
        Right={SingleUser}
        func={() => navigation.navigate('Profile')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
