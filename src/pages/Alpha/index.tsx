import {useState} from 'react';
import {
  SafeAreaView,
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

export default function Alpha() {
  const navigation: any = useNavigation();
  const [activeTab, setActiveTab] = useState(0);
  const [active, setActive] = useState(false);

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
    {icon: <Card />, text: `Онлайн-\nоплата`, link: () => setActive(true)},
    {icon: <QuesDock />, text: `Вопросы и\nответы`, link: () => setActive(true)},
  ];

  const components = [<Personal />, <Buisenes />];

  const toggleModal = () => {
    setActive(false);
  };

  return (
    <SafeAreaView>
      <Header
        id="Alpha"
        Left={BellIcon}
        text="Мой Альфа"
        Right={SingleUser}
        func={() => navigation.navigate('Profile')}
        funcLeft={() => navigation.navigate('Notifications')}
      />
      <ScrollView>
        <CustomModal active={active} onClose={toggleModal} />
        <View style={styles.Wrapper}>
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
                style={{display: 'flex', flexDirection: 'column'}}>
                <TouchableOpacity
                  onPress={() => item.link()}
                  style={{
                    padding: 22,
                    borderRadius: 20,
                    backgroundColor: '#FFFFFF',
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
          <TouchableOpacity onPress={() => navigation.navigate('CalcPrice')}>
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
