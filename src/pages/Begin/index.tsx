import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {useNavigation} from '@react-navigation/native';
import World from './icons/world';
import Boxes from './icons/boxes';
import Shar from './icons/Shar';
import One from './icons/One';
import SAL from './icons/SAL';
import {ButtonCustom} from '../../components/UI/Buttons/Button';

const {width: screenWidth} = Dimensions.get('window');

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

  // Animated value для горизонтального скролла (прогресс-бар)
  const scrollX = useRef(new Animated.Value(0)).current;
  const progressContainerWidth = screenWidth * 0.9;
  const progressBarWidth = scrollX.interpolate({
    inputRange: [0, (temps.length - 1) * screenWidth],
    outputRange: [0, progressContainerWidth],
    extrapolate: 'clamp',
  });

  // Animated value для анимации нижней панели
  // По умолчанию масштаб равен 1
  const buttonScale = useRef(new Animated.Value(1)).current;

  // Если последний слайд, запускаем анимацию масштабирования (например, с 0.8 до 1)
  useEffect(() => {
    if (step === temps.length - 1) {
      buttonScale.setValue(0.98);
      Animated.spring(buttonScale, {
        toValue: 1,
        friction: 2,
        useNativeDriver: true,
      }).start();
    } else {
      // Если не последний, сбрасываем масштаб до 1 (без анимации)
      buttonScale.setValue(1);
    }
  }, [step, buttonScale]);

  const onIndexChanged = (index: number) => {
    setStep(index);
  };

  const outStep = () => {
    if (step === temps.length - 1) {
      navigation.navigate('Login');
    } else {
      setStep(step + 1);
    }
  };

  return (
    <View style={styles.main}>
      {/* Прогресс-бар */}
      <View style={styles.progressBarContainer}>
        <Animated.View
          style={[styles.progressBar, {width: progressBarWidth}]}
        />
      </View>

      {/* Свайпер */}
      <View style={styles.swiperWrapper}>
        <Swiper
          horizontal={true}
          loop={false}
          showsPagination={false}
          index={step}
          onIndexChanged={onIndexChanged}
          containerStyle={styles.swiperContainer}
          style={styles.swiperStyle}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false},
          )}>
          {temps.map((item, index) => (
            <View style={styles.slide} key={index}>
              <View style={{alignSelf: 'center'}}>{item.Icon}</View>
              <Text style={styles.text}>{item.text}</Text>
            </View>
          ))}
        </Swiper>
      </View>

      {/* Нижняя панель с кнопками и ссылками - всегда видна, но с анимацией на последнем слайде */}
      <Animated.View
        style={[styles.statistic, {transform: [{scale: buttonScale}]}]}>
        <TouchableOpacity onPress={() => navigation.navigate('TarifMain')}>
          {step < 3 && <Text style={styles.linkText}>Узнайте наши тарифы</Text>}
        </TouchableOpacity>
        {step > 3 && (
          <View style={styles.buttonsRow}>
            <ButtonCustom
              style={styles.buttonHalf}
              title="Войти"
              onClick={() => navigation.navigate('Login')}
            />
            <ButtonCustom
              style={styles.buttonHalf}
              title="Регистрация"
              onClick={() => navigation.navigate('SignUp')}
            />
          </View>
        )}
        {step > 3 ? (
          <View style={{width: '90%'}}>
            <ButtonCustom
              style={{
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: 'black',
              }}
              black
              textStyle={{color: 'black'}}
              title="Пропустить"
              onClick={() => navigation.navigate('MainNavigation')}
            />
          </View>
        ) : (
          <View style={{width: '90%'}}>
            <ButtonCustom title="Начать" onClick={outStep} />
          </View>
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
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
    alignSelf: 'center',
    zIndex: 10,
    borderRadius: 2,
  },
  progressBar: {
    height: '100%',
    backgroundColor: 'black',
  },
  swiperWrapper: {
    position: 'absolute',
    flex: 1,
    width: '100%',
    height: '100%',
  },
  swiperContainer: {
    flex: 1,
    width: '100%',
  },
  swiperStyle: {
    height: 500,
    display: 'flex',
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    width: screenWidth,
  },
  text: {
    fontWeight: '700',
    fontSize: 26,
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'Futura',
  },
  linkText: {
    textDecorationLine: 'underline',
    marginTop: 10,
    fontFamily: 'Exo 2',
  },
  statistic: {
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    bottom: 40,
    gap: 10,
  },
  buttonsRow: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  buttonHalf: {
    width: '49%',
  },
  skipButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'black',
  },
  skipButtonText: {
    color: 'black',
  },
});
