import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Linking,
} from 'react-native';
import Header from '../../screens/Header';
import SingleUser from '../../assets/icons/SingleUser';
import {BannerWrapper} from '../../components/Containers/BannerContainer';
import {useNavigation} from '@react-navigation/native';
import {SearchInput} from '../../components/UI/SearchInput';
import Vosk from '../../assets/icons/Vosk';
import VoskArrow from '../../assets/icons/VoskArrow';
import {useAuth} from '../../hooks/useAuth';
import {statusColor} from '../../utils/helpers';
import Checl from '../../assets/icons/Checktrue';
import Nakladnoi from '../../assets/icons/Nakladoi';
import AlfaChina from '../../assets/icons/strategy/first';
import BrandAll from '../../assets/icons/strategy/third';
import AlhaCargoBrand from '../../assets/icons/strategy/second';

export default function WatchOrder() {
  const navigation: any = useNavigation();

  const user = useAuth();
  const accessToken = user?.accessToken;

  console.log(accessToken);

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState([]);
  const [zakaz, setZakaz] = useState('');
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const getParcel = async (id: string | number) => {
    try {
      setLoading(true);
      const response: any = await fetch(
        `https://alpha-cargo.kg/api/parcels/invoice/${id}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      const res = await response.json();
      setStatus(res?.Statuses || []);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getParcel(zakaz);
  }, [zakaz]);

  const openWhatsAppOrWebsite = async (phoneNumber: string) => {
    const whatsAppUrl = `whatsapp://send?phone=${phoneNumber}`;
    const webWhatsAppUrl = `https://wa.me/${phoneNumber}`;
    try {
      const supported = await Linking.canOpenURL(whatsAppUrl);
      if (supported) {
        await Linking.openURL(whatsAppUrl);
      } else {
        await Linking.openURL(webWhatsAppUrl);
      }
    } catch (error) {
      await Linking.openURL(webWhatsAppUrl);
    }
  };

  return (
    <View style={styles.safeArea}>
      <Header
        id="watchOrder"
        func={() => navigation.navigate('Profile')}
        Right={SingleUser}
        placeholder="Номер посылки"
        text="Отследить заказ"
      />
      <ScrollView style={styles.scrollView}>
        <SearchInput
          id="d"
          value={zakaz}
          onChange={(e: any) => setZakaz(e)}
          placeholder="Номер накладной"
        />
        <TouchableOpacity
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            marginTop: 15,
            paddingLeft: 10,
          }}
          onPress={() => setDropdownVisible(true)}>
          <Vosk />
          <Text
            style={{
              color: '#878787',
              fontSize: 15,
              textDecorationLine: 'underline',
              fontFamily: 'Exo 2',
            }}>
            Как узнать номер накладной?
          </Text>
        </TouchableOpacity>
        <View style={styles.timeline}>
          {status?.map((item: any, index: number) => (
            <View key={index} style={styles.itemContainer}>
              <View style={styles.iconContainer}>
                <View
                  style={[
                    styles.iconWrapper,
                    {
                      backgroundColor: statusColor(item.status),
                    },
                  ]}>
                  <Checl />
                </View>
                {index !== status.length - 1 && <View style={styles.line} />}
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.date}>{item.date.split(' ')[0]}</Text>
                <Text style={styles.status}>{item.status}</Text>
              </View>
            </View>
          ))}
        </View>
        <View style={styles.Wrapper}>
          <Text style={[styles.colon, {fontFamily: 'Exo 2'}]}>
            Наши партнеры
          </Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScrollView}>
          <View style={styles.headerWrapper}>
            <TouchableOpacity onPress={() => openWhatsAppOrWebsite('996778777887')}>
              <AlfaChina />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openWhatsAppOrWebsite('996222990990')}>
              <AlhaCargoBrand />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openWhatsAppOrWebsite('996777792777')}>
              <BrandAll />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ScrollView>
      <Modal
        transparent
        visible={isDropdownVisible}
        animationType="fade"
        onRequestClose={() => setDropdownVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setDropdownVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.dropdownContainer}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    marginLeft: 20,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}>
                  <Nakladnoi />
                  <View style={{paddingTop: 10}}>
                    <VoskArrow />
                  </View>
                </View>
              </View>
              <Text
                style={{fontWeight: 600, marginTop: 10, fontFamily: 'Exo 2'}}>
                Как узнать номер накладной?
              </Text>
              <Text style={{marginTop: 10, fontFamily: 'Exo 2'}}>
                Номер накладной можно найти в правом верхнем
              </Text>
              <Text style={{fontFamily: 'Exo 2'}}>углу вашего документа.</Text>
              <Text style={{fontFamily: 'Exo 2'}}>
                Это 14-значный номер, который используется для
              </Text>
              <Text style={{fontFamily: 'Exo 2'}}>
                отслеживания вашего груза.
              </Text>
              <Text style={{fontFamily: 'Exo 2'}}>Пример: 02.240202151313</Text>
              <Text style={{marginTop: 10, fontFamily: 'Exo 2'}}>
                Введите этот номер в приложении, чтобы узнать{' '}
              </Text>
              <Text style={{fontFamily: 'Exo 2'}}>
                статус доставки вашего груза.
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    marginTop: -20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    zIndex: 9999,
    backgroundColor: 'white',
    padding: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: '#8C8C8C',
    borderWidth: 1,
    maxHeight: '70%',
    width: '80%',
    padding: 20,
    overflow: 'scroll',
  },
  Wrapper: {
    paddingVertical: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    alignItems: 'center',
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000018',
    textAlign: 'center',
  },
  watchOrderContainer: {
    backgroundColor: '#02447F',
    borderRadius: 10,
    padding: 10,
  },
  colon: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'left',
    width: '100%',
  },
  info: {
    color: '#8C8C8C',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  horizontalScrollView: {},
  container: {
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  statusHighlight: {
    color: '#203B7A',
  },
  timeline: {
    marginLeft: 10,
    marginTop: 25,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    gap: 10,
  },
  iconWrapper: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    width: 2,
    height: 40,
    backgroundColor: '#BDBDBD',
    position: 'absolute',
    top: 30,
    left: 14,
  },
  textContainer: {
    flex: 1,
  },
  date: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 4,
    fontFamily: 'Exo 2',
  },
  status: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'Exo 2',
  },
});
