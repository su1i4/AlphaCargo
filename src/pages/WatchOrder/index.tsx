import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Header from '../../screens/Header';
import BellIcon from '../../assets/icons/BellIcon';
import SingleUser from '../../assets/icons/SingleUser';
import WatchOrde from '../../assets/icons/WatchOrder';
import {GradientWrapper} from '../../components/Containers/WatchOrderHeader';
import {BannerWrapper} from '../../components/Containers/BannerContainer';
import {useNavigation} from '@react-navigation/native';

export default function WatchOrder() {
  const navigation: any = useNavigation();

  const Components = [
    {color: '#FF8A8A', text: 'Хранение товара'},
    {color: '#495665', text: 'Бесплатная доставка'},
    {color: '#604C79', text: 'О нашей команде'},
    {color: '#7ABBA8', text: 'Ваши посылки'},
    {color: '#FF8A8A', text: 'Хранение товара'},
    {color: '#495665', text: 'Бесплатная доставка'},
    {color: '#604C79', text: 'О нашей команде'},
    {color: '#7ABBA8', text: 'Ваши посылки'},
  ];

  const Right = () => {
    return (
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
          <BellIcon size={19} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <SingleUser size={19} />
        </TouchableOpacity>
      </View>
    );
  };

  const [text, setText] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        id="watchOrder"
        value={text}
        onChange={setText}
        isSearch
        placeholder="Номер посылки"
        text="Отследить заказ"
        Right={Right}
      />
      <ScrollView style={styles.scrollView}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScrollView}>
          <View style={[styles.headerWrapper, {paddingTop: 15}]}>
            {Components.map((item, index) => (
              <GradientWrapper
                key={index}
                text={item.text}
                color={item.color}
              />
            ))}
          </View>
        </ScrollView>
        <View style={styles.Wrapper}>
          <View>
            <Text style={styles.title}>
              Мы - доставляем<Text style={{color: '#02447F'}}> быстро,</Text>
            </Text>
            <Text style={styles.title}>
              вы - платите<Text style={{color: '#94C325'}}> мало</Text>
            </Text>
          </View>
          <View style={styles.watchOrderContainer}>
            <WatchOrde />
          </View>
          <Text style={styles.info}>
            Оформите заявку в два клика и получите свою посылку. Войдите в
            личный кабинет вы сможете отслеить свои посылки и ппроверить
            накладные
          </Text>
          <Text style={styles.colon}>Наши партнеры</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScrollView}>
          <View style={styles.headerWrapper}>
            {['', ''].map((_, index) => (
              <BannerWrapper key={index} index={index} />
            ))}
          </View>
        </ScrollView>
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
    fontSize: 15,
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
  horizontalScrollView: {
    paddingHorizontal: 20,
  },
});
