import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Header from '../Header';
import {useNavigation} from '@react-navigation/native';
import LogoutIcon from '../../assets/icons/LogoutIcon';
import BellIcon from '../../assets/icons/BellIcon';
import Serebro from '../../assets/svg/Serebro';
import Standart from '../../assets/icons/Reward/Standart';
import Bronza from '../../assets/icons/Reward/Bronza';
import Zoloto from '../../assets/icons/Reward/Zoloto';
import Platina from '../../assets/icons/Reward/Platina';
import SerebroIcon from '../../assets/icons/Reward/Serebro';
import {Panel} from '../Panel';

export default function Reward() {
  const naviagation: any = useNavigation();

  const data = [
    {
      name: 'Платежи MBANK',
      text: 'Совершите хотябы 1 платеж в MBANK',
    },
    {
      name: 'Оборот денег до 10000 сомов',
      text: 'Сумма платежей через приложение или MBANK',
    },
    {
      name: 'Количество платежей до 5',
      text: 'Количество платежей через приложение или MBANK',
    },
  ];

  const items = [
    {
      text: 'Стандарт',
      icon: <Standart />,
    },
    {
      text: 'Бронза',
      icon: <Bronza />,
    },
    {
      text: 'Серебро',
      icon: <SerebroIcon />,
    },
    {
      text: 'Золото',
      icon: <Zoloto />,
    },
    {
      text: 'Платина',
      icon: <Platina />,
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        id="Reward"
        text="Награды"
        Left={BellIcon}
        Right={LogoutIcon}
        func={() => naviagation.goBack()}
        funcLeft={() => naviagation.navigate('Notifications')}
      />
      <ScrollView style={styles.scrollView}>
        <View style={styles.Wrapper}>
          <View style={styles.Main}>
            <Serebro />
            <View style={styles.MainInside}>
              <Text style={styles.MainText}>Серебро</Text>
              <View style={styles.ProgressBar} />
            </View>
          </View>
          <View style={styles.LinkWrap}>
            {items.map((item: any, index: number) => (
              <TouchableOpacity
                onPress={() => naviagation.navigate(item.link)}
                style={styles.LinkInside}
                key={index}>
                {item.icon}
                <Text style={styles.LinkInsideText}>{item.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Panel
            content={
              <View
                style={{
                  height: 'auto',
                  display: 'flex',
                  paddingRight: 15,
                  flexDirection: 'column',
                  alignSelf: 'center'
                }}>
                <Text style={styles.Meg}>До 4% бонусов от</Text>
                <Text style={styles.Meg}>покупок у</Text>
                <Text style={styles.Meg}>партнеров</Text>
              </View>
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  Wrapper: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  Main: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    gap: 8,
  },
  MainInside: {
    display: 'flex',
    flexDirection: 'column',
    width: '80%',
    gap: 8,
  },
  MainText: {
    color: '#02447F',
    fontSize: 15,
    fontWeight: '600',
  },
  ProgressBar: {
    backgroundColor: '#02447F',
    borderRadius: 5,
    height: 6,
    width: '100%',
  },
  LinkWrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
  },
  LinkInside: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  LinkInsideText: {
    color: '#02447F',
    fontSize: 14,
    fontWeight: '400',
  },
  Meg: {
    color: '#F9FFFF',
    fontSize: 20,
    fontWeight: '600',
  },
});
