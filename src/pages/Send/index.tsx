import {useEffect, useState} from 'react';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import {useAuth} from '../../hooks/useAuth';
import {
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
import {useFindParcelQuery} from '../../services/base.service';
import {ParcelCard} from './parcelCard';
import {OneParcelCard} from './oneParcelCard';
import {URL} from '../../utils/consts';

export default function Send() {
  const user = useAuth();
  const accessToken = user?.accessToken;
  const [parcelFind, setParcelFind] = useState('');
  const [originalData, setOriginalData] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const {data: oneParcel = null, isLoading: oneParcelLoading} =
    useFindParcelQuery(parcelFind.trim());
  const naviagation: any = useNavigation();
  const [activeTab, setActiveTab] = useState(0);

  const phoneNumber = '+996772007183';
  const whatsAppUrl = `whatsapp://send?phone=${phoneNumber}`;
  const webWhatsAppUrl = `https://wa.me/${phoneNumber}`;

  const getParcel = async () => {
    try {
      setLoading(true);
      const response: any = await fetch(`${URL}/parcels`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const res = await response.json();
      setOriginalData(res?.History || []);
      setData(res?.History || []);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken) {
      getParcel();
    }
  }, [user, accessToken]);

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

  useEffect(() => {
    switch (activeTab) {
      case 0:
        setData(originalData);
        break;
      case 1:
        setData(originalData.filter((item: any) => item.payment === true));
        break;
      case 2:
        setData(originalData.filter((item: any) => !item.payment));
        break;
      default:
        break;
    }
  }, [activeTab, originalData]);

  const getPdf = async (invoiceNumber: string) => {
    try {
      const response = await fetch(
        `${URL}/parcels/invoice/${invoiceNumber}/pdf`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/pdf',
          },
        },
      );
      if (!response.ok) {
        throw new Error('Failed to fetch PDF');
      }
      const blob = await response.blob();
      const filePath = `${RNFS.DocumentDirectoryPath}/invoice-${invoiceNumber}.pdf`;
      const base64Data = await blobToBase64(blob);
      await RNFS.writeFile(filePath, base64Data, 'base64');

      await FileViewer.open(filePath, {
        showOpenWithDialog: true,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to download or open the PDF');
      console.error(error);
    }
  };

  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(blob);
    });
  };

  console.log(oneParcel, 'this is fuck');

  return (
    <View>
      <Header
        id="watchOrder"
        text="Отправления"
        placeholder="Номер посылки"
        value={parcelFind}
        onChange={setParcelFind}
        isSearch
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
            <Text style={{fontSize: 15, fontWeight: '400', color: '#F9FFFF'}}>
              Тарифы
            </Text>
          </TouchableOpacity>
          {data && !parcelFind && (
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
          )}
          {isLoading || oneParcelLoading ? (
            <Text>Загрузка ...</Text>
          ) : (parcelFind && !oneParcel?.Statuses?.length) ||
            (!parcelFind && (!data || data.length === 0)) ? (
            <Text>Пусто</Text>
          ) : null}
          {oneParcel?.Statuses?.length && (
            <OneParcelCard oneParcel={oneParcel?.Statuses} />
          )}
          {data &&
            !parcelFind &&
            data?.map((item: any) => (
              <ParcelCard oneParcel={item} getPdf={getPdf} />
            ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  Wrapper: {
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
    marginBottom: '40%',
  },
  brokeTools: {
    width: '100%',
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
    fontSize: 15,
    fontWeight: '400',
    textAlign: 'center',
  },
  container: {
    backgroundColor: '#02447F',
    borderRadius: 10,
    height: 80,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
