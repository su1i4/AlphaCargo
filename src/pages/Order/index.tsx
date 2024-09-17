import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Header from '../../screens/Header';
import SingleUser from '../../assets/icons/SingleUser';
import LocateIcon from '../../assets/icons/LocateIcon';
import BurgerIcon from '../../assets/icons/BurgerIcon';
import {useNavigation} from '@react-navigation/native';
import {
  useGetAllCitiesQuery,
  useGetAllCountriesQuery,
  useGetOfficesQuery,
} from '../../services/base.service';

export default function Order() {
  const {data = []} = useGetAllCitiesQuery();
  const {data: offices = []} = useGetOfficesQuery();
  const {data: countries = []} = useGetAllCountriesQuery();

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
        <View style={[styles.popAp, {bottom: 80}]}>
          <LocateIcon />
        </View>
        <TouchableOpacity
          style={[styles.popAp, {bottom: 20}]}
          onPress={() =>
            navigation.navigate('Points', {
              cities: data,
              offices: offices,
              countries: countries,
            })
          }>
          <BurgerIcon size={28} active={true} lox={true} />
        </TouchableOpacity>
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
  popAp: {
    position: 'absolute',
    right: 20,
    backgroundColor: '#94C325',
    width: 50,
    height: 50,
    borderRadius: 50,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    height: '100%',
    width: '100%',
  },
});
