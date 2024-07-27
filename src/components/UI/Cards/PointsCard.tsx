import {View, StyleSheet, Text} from 'react-native';
import Angar from '../../../assets/icons/Angar';
import {getStatus} from '../../../utils/helpers';
import { useNavigation } from '@react-navigation/native';

export const PointsCard = ({item, country, city}: any) => {
  const navigation: any = useNavigation()

  const {text, color} = getStatus(item.openingHour, item.closingHour);

  return (
    <View key={item.address} style={styles.card}>
      <View style={styles.icon}>
        <Angar />
      </View>
      <View style={[styles.headerWrap, {justifyContent: 'space-between'}]}>
        <Text style={styles.location}>
          {country}, {city}
        </Text>
        <Text>307 м</Text>
      </View>
      <Text style={styles.address}>{item.address}</Text>
      <View style={[styles.headerWrap, {gap: 5}]}>
        <View style={{width: 10, height: 10, backgroundColor: color, borderRadius: 10, marginTop: 2}} />
        <Text style={styles.location}>{text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingVertical: 15,
    borderBottomColor: '#27457C4A',
    borderBottomWidth: 1,
    paddingLeft: 40,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: 5
  },
  headerWrap: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    position: 'absolute',
    top: 17,
    left: 2,
  },
  address: {
    color: '#000018',
    fontSize: 15,
    fontWeight: '600',
  },
  location: {
    color: '#000018',
    fontSize: 14,
    fontWeight: '400',
  },
});
