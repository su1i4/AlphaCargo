import {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Linking,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Header from '../../screens/Header';
import BellIcon from '../../assets/icons/BellIcon';
import SingleUser from '../../assets/icons/SingleUser';
import {Panel} from '../../screens/Panel';
import {Tab} from '../../components/UI/Tab';
import HandIcon from '../../assets/icons/HandIcon';
import {Personal} from '../../screens/AlphaTabContent/Personal';
import {Buisenes} from '../../screens/AlphaTabContent/Buisenes';
import QuesDock from '../../assets/icons/QuesDock';
import Card from '../../assets/icons/Card';
import FaUser from '../../assets/icons/FaUser';
import {useNavigation} from '@react-navigation/native';
import CustomModal from '../../components/UI/Modal';
import ProfileUser from '../../assets/icons/ProfileUser';
import {useAuth} from '../../hooks/useAuth';
import LinearGradient from 'react-native-linear-gradient';

export default function Alpha() {
  const user = useAuth();
  const accessToken = user?.accessToken;

  const navigation: any = useNavigation();
  const [activeTab, setActiveTab] = useState(0);
  const [active, setActive] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [fio, setFio] = useState('');
  const [loading, setLoading] = useState(true);

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

  const HeaderIcons = [
    {
      icon: <BellIcon color="#94C325" size={18} strokeWidth={2} />,
      text: `Уведом-\nления`,
      link: () => navigation.navigate('Notifications'),
    },
    {
      icon: <FaUser />,
      text: `Вызов\nвыездной\nгруппы`,
      link: openWhatsAppOrWebsite,
    },
    {
      icon: <Card />,
      text: `Онлайн-\nоплата`,
      link: () => navigation.navigate('Payment'),
    },
    {
      icon: <QuesDock />,
      text: `Вопросы и\nответы`,
      link: () => navigation.navigate('Help'),
    },
  ];

  const components = [<Personal />, <Buisenes />];

  const toggleModal = () => {
    setActive(false);
  };

  const fetchNotifications = async () => {
    try {
      const response = await fetch('https://alpha-cargo.kg/api/users', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data, 'this is user');
      if (data) {
        setEmail(data.email);
        setFio(data.fio);
        setPhone(data.phone);
      }
    } catch (err: any) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchNotifications();
    } else {
      setLoading(false);
    }
  }, [accessToken]);

  return (
    <View style={{flex: 1}}>
      <Header
        id="Alpha"
        Left={BellIcon}
        text="Мой Альфа"
        Right={SingleUser}
        func={() => navigation.navigate('Profile')}
        funcLeft={() => navigation.navigate('Notifications')}
      />
      <ScrollView style={styles.scrollView}>
        <CustomModal active={active} onClose={toggleModal} />
        <TouchableOpacity
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}
          onPress={() => navigation.navigate('Profile')}>
          <ProfileUser />
          <Text style={{color: 'black', fontWeight: 500, fontSize: 18}}>
            {phone}
          </Text>
        </TouchableOpacity>
        <LinearGradient
          colors={['#009DE1', '#1FA5B9', '#6EB856', '#A0C417']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={{
            paddingHorizontal: 20,
            paddingVertical: 7,
            borderRadius: 20,
            marginTop: 15,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 16, fontWeight: 500}}>
            Ваш уникальный код
          </Text>
          <LinearGradient
            colors={['#203B7A', '#026297', '#006599']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={{
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 20,
            }}>
            <Text style={{fontSize: 16, fontWeight: 500, color: 'white'}}>
              к0707
            </Text>
          </LinearGradient>
        </LinearGradient>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
          }}>
          {HeaderIcons.map((item: any, index) => (
            <View
              key={index}
              style={{display: 'flex', flexDirection: 'column', marginTop: 10}}>
              <TouchableOpacity
                onPress={() => item.link()}
                style={{
                  padding: 22,
                  borderRadius: 20,
                  backgroundColor: '#F0F1F3',
                }}>
                {item.icon}
              </TouchableOpacity>
              <Text
                style={{
                  color: '#000018',
                  fontSize: 12,
                  fontWeight: '400',
                  textAlign: 'center',
                }}>
                {item.text}
              </Text>
            </View>
          ))}
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 10,
          }}>
          <View
            style={{
              width: '48%',
              height: 80,
              borderRadius: 16,
              backgroundColor: '#F0F1F3',
              padding: 10,
            }}>
            <Text style={{fontSize: 16, fontWeight: 500, color: 'black'}}>
              За декабрь
            </Text>
            <Text style={{fontSize: 16, fontWeight: 500, color: 'green'}}>
              0
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Bonus')}
            style={{
              width: '48%',
              height: 80,
              borderRadius: 16,
              backgroundColor: '#F0F1F3',
              padding: 10,
            }}>
            <Text style={{fontSize: 16, fontWeight: 500, color: 'black'}}>
              Мои баллы
            </Text>
            <Text style={{fontSize: 16, fontWeight: 500, color: 'green'}}>
              1
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{marginBottom: 10}}
          onPress={() => navigation.navigate('CalcPrice')}>
          <Panel />
        </TouchableOpacity>
        <Tab text="Сервисы" active={activeTab} setActive={setActiveTab}>
          <View>
            <SingleUser size={19} />
            <Text style={{color: '#F9FFFF'}}>Частным клиентам</Text>
          </View>
          <View>
            <HandIcon size={19} />
            <Text style={{color: '#F9FFFF'}}>Бизнесу</Text>
          </View>
        </Tab>
        {components[activeTab]}
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
  Wrapper: {
    padding: 20,
    paddingBottom: 40,
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
    marginBottom: '17%',
  },
  titles: {
    color: '#8C8C8C',
    fontSize: 13,
    fontWeight: '400',
  },
  brokeTools: {
    // width: '100%',
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
});
