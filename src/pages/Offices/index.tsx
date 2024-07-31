import React from 'react';
import {SafeAreaView, StyleSheet, View, Text, Dimensions} from 'react-native';
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
        isSearch
        placeholder="Введите адрес"
        id="Orders"
        text="Пункты Альфа"
        Right={SingleUser}
        func={() => navigation.navigate('Profile')}
      />
      <View style={styles.header}>
        <Text style={styles.tab}>Рядом</Text>
        <Text style={styles.tab}>Открыто</Text>
      </View>
      <View style={styles.container}>
        <Text style={{fontSize: 20}}>Здесь будет карта</Text>
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
  header: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  tab: {
    color: '#000000',
    fontSize: 13,
    fontWeight: '400',
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 20,
  },
});
