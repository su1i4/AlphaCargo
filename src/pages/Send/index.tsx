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
  Modal,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import {Tab} from '../../components/UI/Tab';
import {useNavigation} from '@react-navigation/native';
import {ParcelCard} from './parcelCard';
import {URL} from '../../utils/consts';
import VoskArrow from '../../assets/icons/VoskArrow';
import LinearGradient from 'react-native-linear-gradient';
import NewCalcPrice from '../../screens/NewCalcPrice';
import Zakazik from '../../screens/Zakazik';
import NewTarif from '../../screens/NewTarif';
import RNFetchBlob from 'react-native-blob-util';
import { decode } from 'base-64';

const tabs = ['Отправления', 'Рассчитать', 'Заказать выезд', 'Тарифы'];
const texts = [
  'Отправления',
  'Рассчитать доставку',
  'Заказать выезд',
  'Тарифы',
];

export default function Send() {
  const user = useAuth();
  const accessToken = user?.accessToken;
  const [originalData, setOriginalData] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const naviagation: any = useNavigation();
  const [activeTab, setActiveTab] = useState(0);
  const [zakaz, setZakaz] = useState('');
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [tab, setTab] = useState(0);

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
      // Показываем индикатор загрузки
      // Alert.alert('Информация', 'Начинаем загрузку PDF, пожалуйста, подождите...');
      
      // Используем RNFetchBlob для получения PDF напрямую
      const resp = await RNFetchBlob.config({
        fileCache: true,
        appendExt: 'pdf',
      }).fetch(
        'GET',
        `${URL}/parcels/invoice/mobile/${invoiceNumber}/pdf`,
        {
          Authorization: `Bearer ${accessToken}`,
        }
      );
      
      // Получаем путь к файлу
      const filePath = resp.path();
      console.log('Файл сохранен по пути:', filePath);
      
      // Открываем файл
      await FileViewer.open(filePath, { showOpenWithDialog: true });
      
    } catch (error) {
      console.error('Ошибка в процессе создания PDF:', error);
      // Alert.alert(
      //   'Ошибка',
      //   'Не удалось создать или открыть PDF. Попробуйте позже или обратитесь в поддержку.'
      // );
    }
  };

  // Эта функция больше не используется, т.к. мы получаем PDF напрямую
  /*
  const saveAndOpenPDF = async (encodedString: string) => {
    try {
      // Путь для сохранения PDF
      const pdfPath = `${RNFS.DocumentDirectoryPath}/invoice-${Date.now()}.pdf`;
      console.log('Сохраняем PDF по пути:', pdfPath);
  
      // Сохраняем PDF файл
      await RNFS.writeFile(pdfPath, encodedString, 'base64');
      console.log('Файл успешно сохранен');
      
      // Открываем PDF файл с помощью FileViewer
      await FileViewer.open(pdfPath);
      
    } catch (error) {
      console.error('Ошибка при сохранении или открытии PDF:', error);
      Alert.alert('Ошибка', 'Не удалось сохранить или открыть PDF файл');
    }
  };
  */

  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Извлекаем только часть base64 без префикса data:application/pdf;base64,
        const base64data = (reader.result as string).split(',')[1];
        resolve(base64data);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView style={styles.scrollView}>
        <Text style={{fontSize: 30, fontWeight: '700', marginTop: 60, fontFamily: 'Exo 2'}}>
          {texts[tab]}
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{
            paddingVertical: 25,
          }}>
          {tabs.map((item: any, index: number) => {
            return index === tab ? (
              <TouchableOpacity
                key={item}
                onPress={() => setTab(index)}
                style={styles.touchable}>
                <LinearGradient
                  colors={['#009DE1', '#1FA5B9', '#6EB856', '#A0C417']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={styles.gradientBorder}>
                  <View
                    style={[
                      styles.innerButton,
                      {backgroundColor: 'transparent'},
                    ]}>
                    <Text style={{color: '#FFFFFF', fontFamily: 'Exo 2'}}>{tabs[index]}</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                key={item}
                onPress={() => setTab(index)}
                style={styles.touchable}>
                <LinearGradient
                  colors={['#009DE1', '#1FA5B9', '#6EB856', '#A0C417']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={styles.gradientBorder}>
                  <View style={styles.innerButton}>
                    <Text style={{fontFamily: 'Exo 2'}}>{tabs[index]}</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        {tab === 0 && data && (
          <View>
            <Tab
              text="Мои отправления"
              active={activeTab}
              setActive={setActiveTab}>
              <View>
                <Text style={{color: '#F9FFFF', fontFamily: 'Exo 2'}}>Все</Text>
              </View>
              <View>
                <Text style={{color: '#F9FFFF', fontFamily: 'Exo 2'}}>Оплаченные</Text>
              </View>
              <View>
                <Text style={{color: '#F9FFFF', fontFamily: 'Exo 2'}}>Не оплаченные</Text>
              </View>
            </Tab>

            <View style={{marginTop: 20, marginBottom: 50}}>
              {isLoading ? (
                <Text style={{fontSize: 15, fontFamily: 'Exo 2'}}>Загрузка ...</Text>
              ) : !data.length ? (
                <Text style={{fontSize: 15, fontFamily: 'Exo 2'}}>Пусто</Text>
              ) : (
                data.map((item: any) => (
                  <ParcelCard key={item.id} oneParcel={item} getPdf={getPdf} />
                ))
              )}
            </View>
          </View>
        )}
        {tab === 1 && <NewCalcPrice />}
        {tab === 2 && <Zakazik />}
        {tab === 3 && <NewTarif />}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    marginTop: -20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    zIndex: 9999,
    backgroundColor: 'white',
    padding: 20,
  },
  brokeTools: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  content: {
    width: '48.5%',
    backgroundColor: '#F0F1F3',
    borderRadius: 10,
    height: 90,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
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
    marginTop: 10,
    marginBottom: 10,
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

  touchable: {
    borderRadius: 20,
    marginRight: 10,
    overflow: 'hidden',
  },
  gradientBorder: {
    padding: 4, // Толщина рамки
    borderRadius: 20,
  },
  innerButton: {
    backgroundColor: '#FFFFFF', // Цвет фона кнопки
    borderRadius: 18, // Немного меньше, чтобы градиент был виден
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  buttonText: {
    color: '#203B7A',
    fontSize: 17,
    fontWeight: '400',
  },
});
