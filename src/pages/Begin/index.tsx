import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {useState} from 'react';
import World from './icons/world';
import Boxes from './icons/boxes';
import Shar from './icons/Shar';
import One from './icons/One';
import SAL from './icons/SAL';
import {ButtonCustom} from '../../components/UI/Buttons/Button';
import {useNavigation} from '@react-navigation/native';

const temps = [
  {
    Icon: <World />,
    text: '19 ФИЛИАЛОВ. \n 3 СТРАНЫ. ВМЕСТЕ \n С АЛЬФА КАРГО',
  },
  {
    Icon: <Boxes />,
    text: 'ОТПРАВЛЯЙТЕ ГРУЗЫ  \n И ПОЛУЧАЙТЕ  \n В УДОБНОМ \n ПУНКТЕ ВЫДАЧИ',
  },
  {
    Icon: <Shar />,
    text: 'ИСПОЛЬЗУЙТЕ  \n НАШИ УСЛУГИ  \n НАХОДЯСЬ  \n В ЛЮБОЙ \n ТОЧКЕ МИРА',
  },
  {
    Icon: <One />,
    text: 'БУДЬТЕ \n ПЕРВЫМИ',
  },
  {
    Icon: <SAL />,
    text: 'АЛЬФА КАРГО \n ДЛЯ ВСЕХ \n ГРУЗОПЕРЕВОЗОК',
  },
];

export default function Begin() {
  const navigation: any = useNavigation();
  const [step, setStep] = useState(0);

  const outStep = () => {
    if (step === 4) {
      navigation.navigate('Login');
    } else {
      setStep(step + 1);
    }
  };

  return (
    <View style={styles.main}>
      <View style={styles.progressBarContainer}>
        <View
          style={[
            styles.progressBar,
            {width: `${((step + 1) / temps.length) * 100}%`},
          ]}
        />
      </View>
      {temps[step].Icon}
      <Text style={styles.text}>{temps[step].text}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('TarifMain')}>
        {step < 3 && (
          <Text style={{textDecorationLine: 'underline'}}>
            Узнайте наши тарифы
          </Text>
        )}
      </TouchableOpacity>
      <View style={styles.statistic}>
        <View
          style={{
            width: '90%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <ButtonCustom
            style={{width: '49%'}}
            title="Войти"
            onClick={() => navigation.navigate('Login')}
          />
          <ButtonCustom
            style={{width: '49%'}}
            title="Регистрация"
            onClick={() => navigation.navigate('SignUp')}
          />
        </View>
        <View style={{width: '90%'}}>
          <ButtonCustom
            style={{backgroundColor: 'transparent', borderWidth: 1, borderColor: 'black'}}
            textStyle={{color: 'black'}}
            black
            title="Пропустить"
            onClick={outStep}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  progressBarContainer: {
    position: 'absolute',
    top: 80,
    width: '90%',
    height: 5,
    backgroundColor: '#ddd',
  },
  progressBar: {
    height: '100%',
    backgroundColor: 'black',
  },
  text: {
    fontWeight: '700',
    fontSize: 30,
    textAlign: 'center',
  },
  statistic: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    bottom: 40,
    gap: 10,
  },
});
