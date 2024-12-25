import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
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
import Mapbox from '@rnmapbox/maps';

const mapBoxAccessToken =
  'pk.eyJ1Ijoic3VsaXNoIiwiYSI6ImNtMGU3a3E2ZzBnZjcyanFzMzgxdWNhMjcifQ.h6HlFjmcCXDjeWrJwqNgUg';
Mapbox.setAccessToken(mapBoxAccessToken);

export default function Order() {
  const {data = []} = useGetAllCitiesQuery();
  const {data: offices = []} = useGetOfficesQuery();
  const {data: countries = []} = useGetAllCountriesQuery();
  const [address, setAddress] = useState('');
  const [selectedOffice, setSelectedOffice] = useState<any>(null);

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
        <Mapbox.MapView
          style={styles.map}
          // centerCoordinate={initialCoordinates}
        >
          {offices?.map((office: any, index: any) => (
            <Mapbox.PointAnnotation
              key={`point-${office.id}`}
              id={`point-${office.id}`}
              coordinate={[Number(office.lng), Number(office.lat)]}
              onSelected={() => setSelectedOffice(office)}>
              <View style={styles.marker}>

              </View>
            </Mapbox.PointAnnotation>
          ))}
        </Mapbox.MapView>

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
    width: '100%',
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
    flex: 1,
    width: '100%',
  },
  markerContainer: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  marker: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#94C325',
    borderWidth: 2,
    borderColor: 'white',
  },
  markerIcon: {
    width: 30,
    height: 30,
    backgroundColor: 'red'
  }
});
