import {StyleSheet, View, Text} from 'react-native';
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
      {temps[step].Icon}
      <Text style={styles.text}>{temps[step].text}</Text>
      <View style={styles.statistic}>
        <View style={{width: '90%'}}>
          <ButtonCustom title="Начать" onClick={outStep} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  text: {
    fontWeight: '700',
    fontSize: 30,
    textAlign: 'center',
  },
  statistic: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 40,
  },
});
