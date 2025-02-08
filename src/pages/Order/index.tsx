import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  PanResponder,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  useGetAllCitiesQuery,
  useGetAllCountriesQuery,
  useGetOfficesQuery,
} from '../../services/base.service';
import Mapbox from '@rnmapbox/maps';
import {Animated} from 'react-native';
import { ButtonCustom } from '../../components/UI/Buttons/Button';

const mapBoxAccessToken =
  'pk.eyJ1Ijoic3VsaXNoIiwiYSI6ImNtMGU3a3E2ZzBnZjcyanFzMzgxdWNhMjcifQ.h6HlFjmcCXDjeWrJwqNgUg';
Mapbox.setAccessToken(mapBoxAccessToken);

const {height} = Dimensions.get('window');
const BOTTOM_SHEET_HEIGHT = height * 0.4;

const BottomSheet = ({visible, onClose}: any) => {
  const translateY = useRef(new Animated.Value(BOTTOM_SHEET_HEIGHT)).current;
  const [isOpen, setIsOpen] = useState(visible);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > BOTTOM_SHEET_HEIGHT / 2) {
          closeSheet();
        } else {
          openSheet();
        }
      },
    }),
  ).current;

  const openSheet = () => {
    setIsOpen(true);
    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeSheet = () => {
    Animated.timing(translateY, {
      toValue: BOTTOM_SHEET_HEIGHT,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIsOpen(false);
      onClose();
    });
  };

  React.useEffect(() => {
    if (visible) {
      openSheet();
    } else {
      closeSheet();
    }
  }, [visible]);

  if (!isOpen) return null;

  return (
    <TouchableWithoutFeedback onPress={closeSheet}>
      <View style={styles.overlay}>
        <Animated.View
          style={[styles.sheet, {transform: [{translateY}]}]}
          {...panResponder.panHandlers}>
          <View style={styles.handle} />
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default function Order() {
  const {data = []} = useGetAllCitiesQuery();
  const {data: offices = []} = useGetOfficesQuery();
  const {data: countries = []} = useGetAllCountriesQuery();
  const navigation: any = useNavigation();
  const [selectedPoint, setSelectedPoint] = useState<any>(null);
  const [visible, setVisible] = useState(false);

  const initialCoordinates = [74.5698, 42.8746];

  const geoJsonData: any = {
    type: 'FeatureCollection',
    features: offices.map((office: any) => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [Number(office.lng), Number(office.lat)],
      },
      properties: {
        id: 2,
        address: office.address,
        city: {
          cityname: office.city.cityname,
          countryId: office.city.countyId,
          id: office.city.id,
          type: office.city.type,
        },
        cityId: office.cityId,
        closingHour: office.closingHour,
        contactNumbers: office.contactNumbers,
        country: {
          countryname: office.country.countryname,
          id: office.country.id,
        },
        countryId: office.countryId,
        openingHour: office.openingHour,
      },
    })),
  };

  const handlePointPress = (event: any) => {
    const {features} = event;
    if (features.length > 0) {
      const selected = features[0];
      setSelectedPoint(selected.properties);
    }
  };

  const selectedAnswer = true;

  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <Mapbox.MapView style={styles.map}>
          <Mapbox.Camera
            zoomLevel={1.1}
            centerCoordinate={initialCoordinates}
          />
          <Mapbox.ShapeSource
            id="offices"
            shape={geoJsonData}
            cluster={true}
            clusterRadius={50}
            onPress={handlePointPress}>
            <Mapbox.SymbolLayer
              id="clusteredPoints"
              style={styles.clusterStyle}
            />
            <Mapbox.CircleLayer
              id="unclusteredPoints"
              filter={['!', ['has', 'point_count']]}
              style={styles.unclusteredPointStyle}
            />
          </Mapbox.ShapeSource>
        </Mapbox.MapView>
        {selectedPoint && (
          <View style={styles.popover}>
            <Text style={styles.popoverTitle}>Информация о точке</Text>
            <Text style={styles.popoverText}>
              <Text style={styles.label}>Адрес: </Text>
              {selectedPoint?.address}
            </Text>
            <Text style={styles.popoverText}>
              <Text style={styles.label}>Город: </Text>
              {selectedPoint?.city?.cityname}
            </Text>
            <Text style={styles.popoverText}>
              <Text style={styles.label}>Страна: </Text>
              {selectedPoint?.country?.countryname}
            </Text>
            <Text style={styles.popoverText}>
              <Text style={styles.label}>Контактный номер: </Text>
              {selectedPoint?.contactNumbers}
            </Text>
            <Text style={styles.popoverText}>
              <Text style={styles.label}>Часы работы </Text>
              {selectedPoint?.openingHour}:00 - {selectedPoint?.closingHour}:00
            </Text>
            <TouchableOpacity
              style={styles.popoverClose}
              onPress={() => setSelectedPoint(null)}>
              <Text style={{color: 'white'}}>Закрыть</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      {/* <ButtonCustom title="Open Bottom Sheet" onClick={() => setVisible(true)} /> */}
      <BottomSheet visible={visible} onClose={() => setVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  map: {
    flex: 1,
    width: '100%',
  },
  popAp: {
    position: 'absolute',
    right: 20,
    backgroundColor: '#94C325',
    width: 50,
    height: 50,
    borderRadius: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clusterStyle: {
    textField: '{point_count}',
    textSize: 14,
    textColor: '#ffffff',
    textHaloWidth: 1,
    textHaloColor: '#000000',
    iconImage: require('../../assets/images/marker.png'),
    iconSize: 1,
  },
  unclusteredPointStyle: {
    circleRadius: 8,
    circleColor: 'transparent',
    circleStrokeWidth: 0,
    circleStrokeColor: '#ffffff',
  },
  popover: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 5},
    zIndex: 9999,
  },
  popoverTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  popoverText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
  },
  popoverClose: {
    alignSelf: 'flex-end',
    backgroundColor: '#94C325',
    padding: 10,
    borderRadius: 5,
  },

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  sheet: {
    width: '100%',
    height: BOTTOM_SHEET_HEIGHT,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
  handle: {
    width: 50,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 2.5,
    alignSelf: 'center',
    marginBottom: 10,
  },
});
