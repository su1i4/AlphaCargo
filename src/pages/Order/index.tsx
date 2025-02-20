import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert,
  Modal,
  // Platform,
  // PermissionsAndroid,
} from 'react-native';
import {
  useGetAllCitiesQuery,
  useGetAllCountriesQuery,
} from '../../services/base.service';
import Mapbox from '@rnmapbox/maps';
import {BottomSheet} from '../../components/UI/BottomSheet';
import LinearGradient from 'react-native-linear-gradient';
import {GeoSearchInput} from './Mine/input';
import {getStatus, searchLocations} from '../../utils/helpers';
import GeoIcon from '../../assets/icons/GeoIcon';
import Calendar from '../../assets/icons/Calendar';
import Phone from '../../assets/icons/Phone';
import Message from '../../assets/icons/Message';
import RouteIcon from '../../assets/icons/Route';
// import Geolocation from 'react-native-geolocation-service';

const mapBoxAccessToken =
  'pk.eyJ1Ijoic3VsaXNoIiwiYSI6ImNtMGU3a3E2ZzBnZjcyanFzMzgxdWNhMjcifQ.h6HlFjmcCXDjeWrJwqNgUg';
Mapbox.setAccessToken(mapBoxAccessToken);

const cities = [{label: 'Бишкек', value: {lat: 42.882004, lng: 74.582748}}];
const TABS = ['Все', 'Пункты выдачи', 'Пункты сдачи'];

export default function Order() {
  const {data = []} = useGetAllCitiesQuery();
  const {data: countries = []} = useGetAllCountriesQuery();
  const [selectedPoint, setSelectedPoint] = useState<any>(null);
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const [activeTab, setActiveTab] = useState(0);
  const [offices, setOffices] = useState<any[]>([]);
  const [lowData, setLowData] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const openMapChoiceModal = () => {
    setIsVisible(true);
  };

  const closeModal = () => {
    setIsVisible(false);
  };

  const [search, setSearch] = useState('');

  const initialCoordinates = [74.5698, 42.8746];

  const geoJsonData: any = {
    type: 'FeatureCollection',
    features: offices?.map((office: any) => ({
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

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('https://alpha-cargo.kg/api/offices', {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setLowData(data);
        setOffices(data);
      } catch (err: any) {}
    };
    fetchNotifications();
  }, []);

  useEffect(() => {
    if (search === '') {
      setOffices(lowData);
    } else {
      const lok = searchLocations(offices, search);
      console.log(lok);
      setOffices(lok);
    }
  }, [search]);

  useEffect(() => {
    switch (activeTab) {
      case 0:
        setOffices(lowData);
        break;
      case 1:
        const lox = lowData.filter((item: any) => item.city.type === 'To');
        setOffices(lox);
        break;
      case 2:
        const lom = lowData.filter((item: any) => item.city.type === 'From');
        setOffices(lom);
        break;
      default:
        setOffices(lowData);
        break;
    }
  }, [activeTab]);

  const handlePointPress = (event: any) => {
    // const {features} = event;
    // if (features.length > 0) {
    //   const selected = features[0];
    //   setSelectedPoint(selected.properties);
    // }
  };

  const openPhoneCall = async (phoneNumber: string) => {
    try {
      const url = `tel:${phoneNumber}`;
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Ошибка', 'Не удалось совершить звонок');
      }
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось совершить звонок');
    }
  };

  const openMessage = async (email: string) => {
    try {
      const url = `mailto:${email}`;
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Ошибка', 'Не удалось открыть почтовый клиент');
      }
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось открыть почтовый клиент');
    }
  };

  const phoneNumber = '+996550559846';

  // const openGoogleMapsRoute = (latitude: any, longitude: any) => {
  //   const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
  //   Linking.openURL(url);
  // };

  const openGoogleMapsRoute = (
    startLatitude: any,
    startLongitude: any,
    endLatitude: any,
    endLongitude: any,
  ) => {
    const url = `https://www.google.com/maps/dir/?api=1&origin=${startLatitude},${startLongitude}&destination=${endLatitude},${endLongitude}`;
    Linking.openURL(url);
  };

  const open2GISRoute = (
    startLatitude: any,
    startLongitude: any,
    endLatitude: any,
    endLongitude: any,
  ) => {
    const url = `dgis://2gis.ru/routeSearch/rsType/car/from/${startLatitude},${startLongitude}/to/${endLatitude},${endLongitude}`;
    Linking.openURL(url);
  };

  const [location, setLocation] = React.useState<any>(null);

  // const getCurrentLocation = async () => {
  //   if (Platform.OS === 'android') {
  //     const permission = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
  //     );
  //     if (permission !== PermissionsAndroid.RESULTS.GRANTED) {
  //       console.warn('Location permission denied');
  //       return;
  //     }
  //   }
  
  //   Geolocation.getCurrentPosition(
  //     (position) => {
  //       const { latitude, longitude } = position.coords;
  //       setLocation({ latitude, longitude });
  //       console.log('Latitude:', latitude, 'Longitude:', longitude);
  //     },
  //     (error) => {
  //       console.warn(error.message);
  //     },
  //     {
  //       enableHighAccuracy: true,
  //       timeout: 15000,
  //       maximumAge: 10000,
  //     }
  //   );
  // };
  
  // useEffect(() => {
  //   getCurrentLocation();
  // }, []);

  return (
    <View style={{flex: 1, position: 'relative'}}>
      <Modal
        transparent={true}
        animationType="fade"
        visible={isVisible}
        onRequestClose={closeModal}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              Выберите приложение для маршрута
            </Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => openGoogleMapsRoute(32, 23, 32, 32)}>
              <Text style={styles.buttonText}>Google Maps</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => open2GISRoute(23, 3, 2, 3)}>
              <Text style={styles.buttonText}>2GIS</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={closeModal}>
              <Text style={styles.cancelText}>Закрыть</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
      </View>
      <BottomSheet>
        {selectedPoint ? (
          ''
        ) : (
          <GeoSearchInput
            value={search}
            onChange={setSearch}
            placeholder="Найти пункт Альфа Карго"
            id="Найти"
          />
        )}
        {selectedPoint ? (
          ''
        ) : (
          <View style={styles.tabs}>
            {TABS.map((item: any, index: number) =>
              activeTab === index ? (
                <LinearGradient
                  key={index}
                  colors={['#203B7A', '#026297', '#006599']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={styles.tab}>
                  <Text style={styles.tabText}>{item}</Text>
                </LinearGradient>
              ) : (
                <TouchableOpacity
                  style={{paddingHorizontal: 10}}
                  onPress={() => setActiveTab(index)}>
                  <Text style={{color: '#2B3F6C'}}>{item}</Text>
                </TouchableOpacity>
              ),
            )}
          </View>
        )}
        {selectedPoint ? (
          <View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                onPress={() => setSelectedPoint(null)}
                style={{width: 100}}>
                <Text style={{fontFamily: 'Exo 2'}}>Закрыть</Text>
              </TouchableOpacity>
              <Text style={{fontSize: 16, fontWeight: '600', fontFamily: 'Exo 2'}}>Пункт Альфа</Text>
              <View style={{width: 100}}></View>
            </View>
            <Text style={{fontSize: 18, fontWeight: '600', marginTop: 20, fontFamily: 'Exo 2'}}>
              {selectedPoint.city.cityname}, улица {selectedPoint.address},{' '}
              {selectedPoint.country.countryname}
            </Text>
            <View
              style={{
                width: '80%',
                backgroundColor:
                  getStatus(
                    selectedPoint.openingHour,
                    selectedPoint.closingHour,
                  ).color + '50',
                padding: 20,
                borderRadius: 16,
                alignSelf: 'center',
                marginTop: 20,
              }}>
              <Text style={{fontFamily: 'Exo 2'}}>График работы</Text>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                }}>
                <View
                  style={{
                    backgroundColor: getStatus(
                      selectedPoint.openingHour,
                      selectedPoint.closingHour,
                    ).color,
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                  }}></View>
                <Text style={{fontSize: 15, marginTop: 3, fontWeight: '600', fontFamily: 'Exo 2'}}>
                  {
                    getStatus(
                      selectedPoint.openingHour,
                      selectedPoint.closingHour,
                    ).text
                  }
                </Text>
              </View>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 20,
              }}>
              <TouchableOpacity
                style={{
                  padding: 10,
                  backgroundColor: '#F0F1F3',
                  borderRadius: 15,
                  width: 100,
                }}
                onPress={() => openPhoneCall(phoneNumber)}>
                <View style={{alignSelf: 'center', marginBottom: 5}}>
                  <Phone />
                </View>
                <Text style={{textAlign: 'center', fontFamily: 'Exo 2'}}>Позвонить</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  padding: 10,
                  backgroundColor: '#F0F1F3',
                  borderRadius: 15,
                  width: 100,
                }}
                onPress={() => openMessage('alphacargo3003@gmail.com')}>
                <View style={{alignSelf: 'center', marginBottom: 5}}>
                  <Message />
                </View>
                <Text style={{textAlign: 'center', fontFamily: 'Exo 2'}}>Написать</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  padding: 10,
                  backgroundColor: '#F0F1F3',
                  borderRadius: 15,
                  width: 100,
                }}
                onPress={openMapChoiceModal}>
                <View style={{alignSelf: 'center', marginBottom: 5}}>
                  <RouteIcon />
                </View>
                <Text style={{textAlign: 'center', fontFamily: 'Exo 2'}}>Маршрут</Text>
              </TouchableOpacity>
            </View>
            <View style={{marginTop: 20}}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                }}>
                <GeoIcon size={22} active />
                <Text style={{fontSize: 15, fontFamily: 'Exo 2'}}>
                  Улица {selectedPoint.address}
                </Text>
              </View>
            </View>
            <View style={{marginTop: 20}}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                  marginLeft: 2,
                }}>
                <Calendar />
                <Text style={{fontSize: 15, fontFamily: 'Exo 2'}}>
                  {selectedPoint.openingHour === 0 &&
                  selectedPoint.closingHour === 24
                    ? 'Работает круглосуточно'
                    : `Работает с ${selectedPoint.openingHour}:00 до ${selectedPoint.closingHour}:00`}
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <ScrollView
            pointerEvents="auto"
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{flexGrow: 1}}
            showsVerticalScrollIndicator={false}
            style={{zIndex: 99999, marginTop: 6}}>
            {offices.length > 0 ? (
              offices?.map((item: any, index: number) => (
                <TouchableOpacity
                  onPress={() => setSelectedPoint(item)}
                  style={{
                    marginTop: 10,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                  key={index}>
                  <View>
                    <Text
                      style={{color: 'black', fontSize: 17, fontWeight: '600', fontFamily: 'Exo 2'}}>
                      {item.address}
                    </Text>
                    <Text style={{color: '#AAAAAA', fontSize: 14, fontFamily: 'Exo 2'}}>
                      {item.city.cityname}, улица {item.address},{' '}
                      {item.country.countryname}
                    </Text>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 5,
                      }}>
                      <View
                        style={{
                          backgroundColor: getStatus(
                            item.openingHour,
                            item.closingHour,
                          ).color,
                          width: 8,
                          height: 8,
                          borderRadius: 4,
                        }}></View>
                      <Text
                        style={{fontSize: 13, color: '#AAAAAA', marginTop: 3, fontFamily: 'Exo 2'}}>
                        {getStatus(item.openingHour, item.closingHour).text}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '700',
                  marginTop: 20,
                  textAlign: 'center',
                }}>
                Пусто
              </Text>
            )}
          </ScrollView>
        )}
      </BottomSheet>
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
    fontFamily: 'Exo 2'
  },
  popoverClose: {
    alignSelf: 'flex-end',
    backgroundColor: '#94C325',
    padding: 10,
    borderRadius: 5,
  },

  header: {
    position: 'absolute',
    top: '10%',
    left: '30%',
    width: '40%',
    right: '70%',
    height: 40,
    zIndex: 9999,
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 13,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headeInner: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  headeInnerTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Exo 2'
  },
  tabs: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  tab: {
    width: 'auto',
    paddingTop: 4,
    paddingBottom: 6,
    paddingHorizontal: 10,
    borderRadius: 14,
  },
  tabText: {
    color: 'white',
    fontFamily: 'Exo 2'
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold',
    fontFamily: 'Exo 2'
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    marginBottom: 10,
    width: '100%',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Exo 2'
  },
  cancelButton: {
    padding: 10,
    backgroundColor: '#FF5722',
    marginTop: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelText: {
    color: 'white',
    fontSize: 13,
    fontFamily: 'Exo 2'
  },
});
