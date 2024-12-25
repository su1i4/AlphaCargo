import {
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
import Tasks from '../../assets/icons/Tasks';
import Reward from '../../assets/icons/Reward';
import Vopros from '../../assets/icons/Vopros';
import {Panel} from '../Panel';

export default function Bonus() {
  const naviagation: any = useNavigation();

  const items = [
    {
      text: 'Задания',
      icon: <Tasks />,
      link: 'Tasks',
    },
    {
      text: 'Награды',
      icon: <Reward />,
      link: 'Reward',
    },
  ];

  return (
    <View style={styles.safeArea}>
      <Header
        id=""
        text="Бонусы"
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
              <View style={styles.textWrapper}>
                <Text style={[styles.text, {fontSize: 20, fontWeight: '600'}]}>
                  3200 бонусов
                </Text>
                <Text style={[styles.text, {fontSize: 13, fontWeight: '400'}]}>
                  Ваш кэшбек
                </Text>
              </View>
            }
          />
          <View style={styles.LinkInside}>
            <Vopros />
            <Text style={{color: '#000018', fontSize: 13, fontWeight: '400'}}>
              О программе лояльности
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
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
    gap: 10,
  },
  LinkInside: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    paddingVertical: 7,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  LinkInsideText: {
    color: '#02447F',
    fontSize: 14,
    fontWeight: '400',
  },
  textWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    width: '60%',
    paddingVertical: 20,
  },
  text: {
    color: '#F9FFFF',
  },
});
