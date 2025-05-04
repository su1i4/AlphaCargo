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
import {Personal} from '../../screens/AlphaTabContent/Personal';
import {Buisenes} from '../../screens/AlphaTabContent/Buisenes';
import Card from '../../assets/icons/Card';
import {useNavigation} from '@react-navigation/native';
import CustomModal from '../../components/UI/Modal';
import ProfileUser from '../../assets/icons/ProfileUser';
import {useAuth} from '../../hooks/useAuth';
import LinearGradient from 'react-native-linear-gradient';
import PersonalIcon from '../../assets/icons/Personal';
import SuitCaseIcon from '../../assets/icons/SuitCase';
import NewNoti from '../../assets/icons/NewNoti';
import NewRaketa from '../../assets/icons/NewRaketa';
import NewFlip from '../../assets/icons/NewFlip';
import NewImage from '../../assets/icons/NewImage';
import NewUsers from '../../assets/icons/NewUsers';

const tabs = ['Частным клиентам', 'Бизнесу'];

export default function Alpha() {
  const user = useAuth();
  const accessToken = user?.accessToken;

  const navigation: any = useNavigation();
  const [activeTab, setActiveTab] = useState(0);
  const [active, setActive] = useState(false);

  const [userData, setUserData] = useState<any>(null);
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<any>(null);
  const [fio, setFio] = useState<any>(null);

  const phoneNumber = '+996772007183';
  const whatsAppUrl = `whatsapp://send?phone=${phoneNumber}`;
  const webWhatsAppUrl = `https://wa.me/${phoneNumber}`;

  useEffect(() => {
    if (accessToken) {
      const fetchNotifications = async () => {
        try {
          const response = await fetch(
            'https://alpha-cargo.kg/api/users/check-phone',
            {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
              },
            },
          );

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json();
          setUserData(data);
        } catch (err: any) {
        } finally {
          setLoading(false);
        }
      };

      fetchNotifications();
    } else {
      setLoading(false);
    }
  }, [accessToken]);

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

  const HeaderIcons = [
    {
      icon: <NewNoti />,
      text: `Уведом-\nления`,
      link: () => navigation.navigate('Notifications'),
    },
    {
      icon: <NewRaketa />,
      text: `Выездная\nгруппа`,
      link: openWhatsAppOrWebsite,
    },
    {
      icon: <NewUsers />,
      text: `Мы в соц-\nсетях`,
      link: () => navigation.navigate('Socials'),
    },
    {
      icon: <Card />,
      text: `Онлайн-\nоплата`,
      link: () => navigation.navigate('Payment'),
    },
    {
      icon: <NewFlip />,
      text: `Поддержка`,
      link: () => navigation.navigate('Help'),
    },
    {
      icon: <NewImage />,
      text: `Оформление`,
      link: () => navigation.navigate('Oformlenie'),
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

  const fetchCode = async () => {
    try {
      const response = await fetch(
        'https://212.2.231.34/alpha_cargo/hs/check_phone',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await response.json();
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
    fetchCode();
  }, [accessToken]);

  const icons = [
    <PersonalIcon color={activeTab === 0 ? 'white' : 'black'} />,
    <SuitCaseIcon color={activeTab === 1 ? 'white' : 'black'} />,
  ];

  return (
    <View style={{flex: 1}}>
      <ScrollView style={styles.scrollView}>
        <CustomModal active={active} onClose={toggleModal} />
        <Text
          style={{
            fontSize: 30,
            fontWeight: '700',
            marginTop: 60,
            fontFamily: 'Exo 2',
          }}>
          Мой Альфа
        </Text>
        <TouchableOpacity
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            marginTop: 20,
          }}
          onPress={() => navigation.navigate('Profile')}>
          <ProfileUser />
          <View>
            <Text
              style={{
                color: 'black',
                fontWeight: '500',
                fontSize: 15,
                width: '90%',
                fontFamily: 'Exo 2',
                marginBottom: 2
              }}
              numberOfLines={2}
              >
              {userData?.Name}
            </Text>
          </View>
        </TouchableOpacity>
        <LinearGradient
          colors={['#009DE1', '#1FA5B9', '#6EB856', '#A0C417']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={{
            paddingHorizontal: 20,
            paddingVertical: 12,
            borderRadius: 20,
            marginTop: 15,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 16, fontWeight: '500', fontFamily: 'Exo 2'}}>
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
            <Text style={{fontSize: 16, fontWeight: '500', color: 'white'}}>
              {userData?.Code}
            </Text>
          </LinearGradient>
        </LinearGradient>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: 10,
            gap: 10,
            flexWrap: 'wrap',
          }}>
          {HeaderIcons.map((item: any, index) => (
            <View
              key={index}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                onPress={() => item.link()}
                style={{
                  width: 70,
                  height: 70,
                  minHeight: 70,
                  maxHeight: 70,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 20,
                  backgroundColor: '#F0F1F3',
                }}>
                {item.icon}
              </TouchableOpacity>
              <Text
                style={{
                  color: '#000018',
                  fontSize: 11,
                  fontWeight: '400',
                  textAlign: 'center',
                  fontFamily: 'Exo 2',
                }}>
                {item.text}
              </Text>
            </View>
          ))}
        </View>
        <Text style={[styles.textHeader, {fontFamily: 'Exo 2'}]}>Сервисы</Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 5,
            paddingVertical: 20,
          }}>
          {tabs.map((item: any, index: number) => {
            return index === activeTab ? (
              <TouchableOpacity
                key={item}
                onPress={() => setActiveTab(index)}
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
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 5,
                      }}>
                      {icons[index]}
                      <Text style={{color: '#FFFFFF', fontFamily: 'Exo 2'}}>
                        {tabs[index]}
                      </Text>
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                key={item}
                onPress={() => setActiveTab(index)}
                style={styles.touchable}>
                <LinearGradient
                  colors={['#009DE1', '#1FA5B9', '#6EB856', '#A0C417']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={styles.gradientBorder}>
                  <View style={styles.innerButton}>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 5,
                      }}>
                      {icons[index]}
                      <Text style={{fontFamily: 'Exo 2'}}>{tabs[index]}</Text>
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            );
          })}
        </View>
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
  textHeader: {
    color: '#000000',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 15,
    fontFamily: 'Exo 2',
  },
});
