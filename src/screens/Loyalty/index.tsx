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
import {ButtonCustom} from '../../components/UI/Buttons/Button';
import LogoutIcon from '../../assets/icons/LogoutIcon';
import MedalOne from '../../assets/icons/MedalOne';
import MedalTwo from '../../assets/icons/MedalTwo';
import MedalThree from '../../assets/icons/MedalThree';
import {useNavigation} from '@react-navigation/native';

export const Loyalty = () => {
  const navigation = useNavigation();
  const Right = () => {
    return ( 
      <TouchableOpacity onPress={() => navigation.goBack()} >
        <LogoutIcon size={19} />
      </TouchableOpacity>
    );
  };

  const Mappin = [
    {
      icon: <MedalOne />,
      text: 'Отправка свыше 100000 кг',
      content: 'Скидка 10% от суммы оплаты',
    },
    {
      icon: <MedalTwo />,
      text: 'Отправка свыше 10000 кг',
      content: 'Скидка 5% от суммы оплаты',
    },
    {
      icon: <MedalThree />,
      text: 'Отправка свыше 1000 кг',
      content: 'Скидка 1% от суммы оплаты',
    },
  ];

  const LEVELS = [1, 2, 3];

  const [text, setText] = useState('');

  const backToLogin = () => {
    console.log('false');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header id="Loyalty" text="Программа лояльности" Right={Right} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.Wrapper}>
          <View style={{width: '100%'}}>
            <Text style={styles.bigText}>Программа лояльности от Альфа</Text>
            <Text style={[styles.smallText, {marginTop: 10}]}>
              Отправляйте посылки, копите баллы и оплачивайте ими до 99%
              от стоимости услуг CDEK, получайте персональные скидки
              и участвуйте в акциях только для своих
            </Text>
            <Text style={[styles.bigText, {marginTop: 25}]}>
              Проценты программы лояльности
            </Text>
            <Text style={[styles.smallText, {marginTop: 10}]}>
              Ваш процент обновляется каждый месяц и зависит от веса отправок
              в текущем месяце. Чем больше посылок, тем выше процент кешбэка
              в следующем месяце!
            </Text>
          </View>
          {Mappin.map((item: any, index: number) => (
            <View key={index} style={styles.container}>
              {item.icon}
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '600',
                  color: '#000018',
                  marginVertical: 5,
                }}>
                {item.text}
              </Text>
              <Text>{item.content}</Text>
            </View>
          ))}
          <ButtonCustom
            style={{width: '100%'}}
            title="Отправить посылку"
            onClick={backToLogin}
            isLoading={false}
          />
          <View style={{width: '100%'}}>
            <Text style={styles.bigText}>Уровни программы лояльности</Text>
            <Text style={[styles.smallText, {marginTop: 10}]}>
              Ваш уровень обновляется каждый месяц и зависит от количества
              отправок в текущем месяце. Чем больше посылок, тем выше процент
              кешбэка в следующем месяце
            </Text>
          </View>
          {LEVELS.map((item: any, index: number) => (
            <View key={index} style={styles.container}>
              {item.icon}
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '600',
                  color: '#02447F',
                  marginVertical: 5,
                }}>
                Уровень {item}%
              </Text>
              <Text>Кэшбек {item}% баллами за каждую отправку</Text>
              <View
                style={{
                  width: '100%',
                  height: 1,
                  backgroundColor: '#27457C4A',
                  marginVertical: 13,
                }}
              />
              <Text>
                <Text style={{color: '#02447F'}}>Начальный уровень</Text> {item}
                присваивается всем, кто подключился к Альфа Карго и еще ничего
                не отправил или отправил только одну посылку в предыдущем месяце
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

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
  bigText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '600',
  },
  smallText: {
    color: '#8C8C8C',
    fontSize: 13,
    fontWeight: '400',
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    width: '100%',
  },
});
