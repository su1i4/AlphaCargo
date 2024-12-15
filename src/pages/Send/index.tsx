import {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import Header from '../../screens/Header';
import SingleUser from '../../assets/icons/SingleUser';
import Calc from '../../assets/icons/Calc';
import CarIcon from '../../assets/icons/CarIcon';
import TarifIcon from '../../assets/icons/TarifIcon';
import {Tab} from '../../components/UI/Tab';
import {useNavigation} from '@react-navigation/native';
import {useGetParcelQuery} from '../../services/base.service';
import Loading from '../../components/UI/Loading';

export default function Send() {
  const {data = [], isLoading} = useGetParcelQuery();
  const naviagation: any = useNavigation();
  const [activeTab, setActiveTab] = useState(0);
  const [text, setText] = useState('');

  const phoneNumber = '+996772007183';
  const whatsAppUrl = `whatsapp://send?phone=${phoneNumber}`;
  const webWhatsAppUrl = `https://wa.me/${phoneNumber}`;

  const openWhatsAppOrWebsite = async () => {
    try {
      const supported = await Linking.canOpenURL(whatsAppUrl);
      if (supported) {
        await Linking.openURL(whatsAppUrl);
      } else {
        await Linking.openURL(webWhatsAppUrl);
      }
    } catch (error) {
      Alert.alert(
        'Ошибка',
        'Не удалось открыть WhatsApp, переход к веб-версии.',
      );
      await Linking.openURL(webWhatsAppUrl);
    }
  };

  console.log(data, 'parcels');

  return (
    <SafeAreaView>
      <Header
        id="watchOrder"
        text="Отправления"
        func={() => naviagation.navigate('Profile')}
        Right={SingleUser}
      />
      <ScrollView>
        <View style={styles.Wrapper}>
          <View style={styles.brokeTools}>
            <TouchableOpacity
              onPress={() => naviagation.navigate('CalcPrice')}
              style={styles.content}>
              <Calc active />
              <Text style={styles.text}>Рассчитать</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={openWhatsAppOrWebsite}
              style={styles.content}>
              <CarIcon />
              <Text style={styles.text}>{`Вызвать\nвыездную группу`}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => naviagation.navigate('Tarif')}
            style={styles.container}>
            <TarifIcon />
            <Text style={{fontSize: 13, fontWeight: '400', color: '#F9FFFF'}}>
              Рассчитать
            </Text>
          </TouchableOpacity>
          <Tab
            text="Мои отправления"
            active={activeTab}
            setActive={setActiveTab}>
            <View>
              <Text style={{color: '#F9FFFF'}}>Все</Text>
            </View>
            <View>
              <Text style={{color: '#F9FFFF'}}>Оплаченные</Text>
            </View>
            <View>
              <Text style={{color: '#F9FFFF'}}>Не оплаченные</Text>
            </View>
          </Tab>
          {isLoading ? (
            <Text>Загрузка ...</Text>
          ) : !data.length ? (
            <Text>Пока что у вас нет посылок</Text>
          ) : (
            <View></View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Wrapper: {
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
    marginBottom: '17%',
  },
  brokeTools: {
    // width: '100%',
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  content: {
    width: '48.5%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    height: 90,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#8C8C8C',
    fontSize: 13,
    fontWeight: '400',
    textAlign: 'center',
  },
  container: {
    backgroundColor: '#02447F',
    borderRadius: 10,
    height: 97,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
