import {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {useGetOfficesQuery} from '../../services/base.service';
import {useNavigation} from '@react-navigation/native';
import {PointsCard} from '../../components/UI/Cards/PointsCard';

export const Points = ({route}: any) => {
  const {cities, offices, countries} = route.params;
  const navigation = useNavigation();

  const [logCountry, setLogCountry] = useState<any>({});
  const [logCities, setLogCities] = useState<any>({});

  useEffect(() => {
    if (cities) {
      const result = cities.reduce((acc: any, item: any) => {
        acc[item.id] = item.cityname;
        return acc;
      }, {});
      setLogCities(result);
    }
    if (countries) {
      const result = countries.reduce((acc: any, item: any) => {
        acc[item.id] = item.countryname;
        return acc;
      }, {});
      setLogCountry(result);
    }
  }, [cities, countries]);

  const close = () => {
    navigation.goBack();
  };

  [
    {
      address: '123 Main St',
      contactNumbers: 'string',
      cityId: 1,
      countryId: 1,
      openingHour: 9,
      closingHour: 18,
    },
  ];

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <View style={styles.Wrapper}>
          <View style={styles.header}>
            <Text style={styles.title}>Пункты Альфа</Text>
            <TouchableOpacity
              style={{position: 'absolute', top: 5}}
              onPress={close}>
              <Text style={styles.close}>Закрыть</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bodyContent}>
            {offices?.map((item: any, index: number) => (
              <PointsCard
                key={index}
                item={item}
                country={logCountry[item.countryId]}
                city={logCities[item.cityId]}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  Wrapper: {
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
    height: '100%',
    paddingTop: Platform.OS === 'ios' ? 55 : 40,
  },
  header: {
    display: 'flex',
    borderBottomWidth: 1,
    borderBottomColor: '#27457C4A',
    position: 'relative',
    paddingBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000018',
    textAlign: 'center',
  },
  close: {
    color: '#94C325',
    fontSize: 14,
    fontWeight: '400',
  },
  bodyContent: {},
});
