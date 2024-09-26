import React from 'react';
import {StyleSheet, View} from 'react-native';
import Header from '../../screens/Header';
import SingleUser from '../../assets/icons/SingleUser';
import {useNavigation} from '@react-navigation/native';
import {useGetAllCitiesQuery} from '../../services/base.service';
import MapboxGL from '@react-native-mapbox-gl/maps';

MapboxGL.setAccessToken('pk.eyJ1IjoiYTZ1eGE0IiwiYSI6ImNscGhibWM5aTA1c28ycm1oNGdjYTYybnQifQ.JFaTlYbkSMf395KgTMMkSQ');

export default function OfficesLog() {
  const {data = []} = useGetAllCitiesQuery();

  const navigation: any = useNavigation();

  // Assuming `data` contains city info with coordinates like [{id, name, longitude, latitude}]
  const initialCoordinates = data.length
    ? [data[0].longitude, data[0].latitude]
    : [38.45, 37.53]; // Default fallback coordinates

  return (
    <View style={styles.container}>
      <Header
        placeholder="Введите адрес"
        id="Orders"
        text="Пункты Альфа"
        Right={SingleUser}
        func={() => navigation.navigate('Profile')}
      />
      
      <MapboxGL.MapView style={styles.map}>
        <MapboxGL.Camera
          zoomLevel={15}
          centerCoordinate={initialCoordinates}
        />

        {data.map((city: any) => (
          <MapboxGL.PointAnnotation
            key={city.id}
            id={`marker-${city.id}`}
            coordinate={[city.longitude, city.latitude]}
          />
        ))}
      </MapboxGL.MapView>
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
