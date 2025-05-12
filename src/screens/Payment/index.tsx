import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Linking,
} from 'react-native';
import Back from '../../assets/icons/Back';
import {useNavigation} from '@react-navigation/native';
import {Input} from '../../components/UI/Inputs/Input';
import {Tab} from '../../components/UI/Tab';
import {ButtonCustom} from '../../components/UI/Buttons/Button';
import Toast from 'react-native-toast-message';
import WhiteWhat from '../../assets/icons/WhiteWhat';

const Payment = () => {
  const navigation: any = useNavigation();
  const [activeTab, setActiveTab] = useState(0);
  const [parcel, setParcel] = useState('');
  const [loading, setLoading] = useState(false);
  const [sum, setSum] = useState(null);
  const [payment, setPayment] = useState(false);

  const phoneNumber = '+996995121822';
  const whatsAppUrl = `whatsapp://send?phone=${phoneNumber}`;
  const webWhatsAppUrl = `https://wa.me/${phoneNumber}`;

  const handlePost = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://alpha-cargo.kg/api/parcels/invoice/${parcel}`,
        {
          method: 'GET',
        },
      );

      if (!response.ok) {
        setSum(null);
        setPayment(false);
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      if (data?.Statuses?.length) {
        const lastStatus = data.Statuses[data.Statuses.length - 1]; // Последний элемент
        setSum(lastStatus.sum);
        setPayment(lastStatus.payment);
      } else {
        setSum(null); // Накладная не найдена
        setPayment(false);
        Toast.show({
          type: 'error',
          text1: 'Ошибка входа',
          text2: 'Не удалось найти накладной номер',
        });
      }
    } catch (err: any) {
      setSum(null);
      setPayment(false);
      console.log('Ошибка при получении данных:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const openWhatsAppOrWebsite = async () => {
    try {
      const supported = await Linking.canOpenURL(whatsAppUrl);
      if (supported) {
        await Linking.openURL(whatsAppUrl);
      } else {
        await Linking.openURL(webWhatsAppUrl);
      }
    } catch (error) {
      // Alert.alert(
      //   'Ошибка',
      //   'Не удалось открыть WhatsApp, переход к веб-версии.',
      // );
      await Linking.openURL(webWhatsAppUrl);
    }
  };

  console.log(sum, payment);

  return (
    <View style={{flex: 1, position: 'relative'}}>
      <View
        style={{
          top: 55,
          position: 'absolute',
          paddingHorizontal: 20,
          zIndex: 99,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Back color="black" />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 30,
            fontWeight: '700',
            marginTop: 20,
            fontFamily: 'Exo 2',
          }}>
          Оплата
        </Text>
      </View>
      <View style={styles.container}>
        <View style={{padding: 20}}>
          <Tab text="Плательщик" active={activeTab} setActive={setActiveTab}>
            <View>
              <Text style={{color: '#F9FFFF', fontFamily: 'Exo 2'}}>
                Частное лицо
              </Text>
            </View>
            <View>
              <Text style={{color: '#F9FFFF', fontFamily: 'Exo 2'}}>
                Юридическое лицо
              </Text>
            </View>
          </Tab>
          <Text style={{marginTop: 10, marginBottom: 10, fontFamily: 'Exo 2'}}>
            Номер накладной
          </Text>
          <Input
            value={parcel}
            onChange={setParcel}
            placeholder="Введите накладной номер"
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            {sum ? (
              <Text
                style={{marginTop: 10, marginBottom: 10, fontFamily: 'Exo 2'}}>
                {payment ? (
                  <Text style={{color: 'green'}}>Оплачено</Text>
                ) : (
                  <Text style={{color: 'red'}}>Не оплачено</Text>
                )}
              </Text>
            ) : (
              ''
            )}
            {sum && payment === false && (
              <Text
                style={{marginTop: 10, marginBottom: 10, fontFamily: 'Exo 2'}}>
                Cумма: {sum} р
              </Text>
            )}
          </View>
          {payment === false && sum !== null && (
            <ButtonCustom
              title="Оплатить"
              onClick={() =>
                navigation.navigate('PaymentList', {
                  invoice_number: parcel,
                  sum: sum,
                })
              }
              style={{marginTop: 10}}
            />
          )}
          <ButtonCustom
            title="Найти"
            isLoading={loading}
            onClick={handlePost}
            style={{marginTop: 10}}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 150,
  },
  header: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#E1E1E1',
  },
  headerText: {
    color: 'black',
    fontSize: 17,
    fontWeight: '600',
  },
  fileButton: {
    marginTop: 10,
    padding: 15,
    backgroundColor: '#ddd',
    borderRadius: 5,
    alignItems: 'center',
  },
  fileButtonText: {
    color: '#333',
  },
});

export default Payment;
