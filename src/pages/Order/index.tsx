import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
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
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

const initialRegion = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export default function Order() {
  const {data = []} = useGetAllCitiesQuery();
  const {data: offices = []} = useGetOfficesQuery();
  const {data: countries = []} = useGetAllCountriesQuery();
  const [address, setAddress] = useState('');
  const [myLocation, setMyLocation] = useState(initialRegion);

  const navigation: any = useNavigation();

  return (
    <View style={{flex: 1}}>
      <Header
        isSearch
        placeholder="Введите адрес"
        id="Orders"
        text="Пункты Альфа"
        Right={SingleUser}
        func={() => navigation.navigate('Profile')}
        value={address}
        onChange={setAddress}
      />
      <View style={styles.header}>
        <Text style={styles.tab}>Рядом</Text>
        <Text style={styles.tab}>Открыто</Text>
      </View>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: myLocation.latitude,
            longitude: myLocation.longitude,
            latitudeDelta: initialRegion.latitudeDelta,
            longitudeDelta: initialRegion.longitudeDelta,
          }}
          provider={PROVIDER_GOOGLE}></MapView>
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
    </View>
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
    ...StyleSheet.absoluteFillObject,
  },
});
