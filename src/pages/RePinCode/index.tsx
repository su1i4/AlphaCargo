import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  SafeAreaView,
  Dimensions,
  Alert,
  Image,
} from 'react-native';
import {PIN_KEY, PIN_KEY_DATE} from '../../utils/consts';
import {useNavigation} from '@react-navigation/native';
import {updatePinSession} from '../../utils/helpers';

const {width} = Dimensions.get('window');
const PIN_LENGTH = 4;

const PinSetupScreen = () => {
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [step, setStep] = useState(1); // 1 for create, 2 for confirm
  const [errorText, setErrorText] = useState('');
  const [shakeAnimation] = useState(new Animated.Value(0));
  const navigation: any = useNavigation();

  // Shake animation on error
  const shakeError = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleNumberPress = (number: any) => {
    if (step === 1 && pin.length < PIN_LENGTH) {
      setPin(prevPin => prevPin + number);
    } else if (step === 2 && confirmPin.length < PIN_LENGTH) {
      setConfirmPin(prevConfirmPin => prevConfirmPin + number);
    }
  };

  const handleDeletePress = () => {
    if (step === 1) {
      setPin(prevPin => prevPin.slice(0, -1));
    } else {
      setConfirmPin(prevConfirmPin => prevConfirmPin.slice(0, -1));
    }
    setErrorText('');
  };

  const handlePinComplete = async () => {
    if (step === 1) {
      if (pin.length === PIN_LENGTH) {
        setStep(2);
      }
    } else if (step === 2) {
      if (confirmPin.length === PIN_LENGTH) {
        if (pin === confirmPin) {
          try {
            // Save PIN
            await AsyncStorage.setItem(PIN_KEY, pin);

            // Update PIN session timestamp
            await updatePinSession();

            console.log('PIN saved successfully');
            Alert.alert('Успех', 'PIN-код успешно установлен', [
              {
                text: 'OK',
                onPress: () => navigation.replace('MainNavigation'),
              },
            ]);
          } catch (error) {
            console.error('Error saving PIN:', error);
            Alert.alert('Ошибка', 'Не удалось сохранить PIN-код');
          }
        } else {
          setErrorText('PIN-коды не совпадают. Попробуйте снова.');
          shakeError();
          setStep(1);
          setPin('');
          setConfirmPin('');
        }
      }
    }
  };

  // Check if PIN is complete
  React.useEffect(() => {
    if (step === 1 && pin.length === PIN_LENGTH) {
      setStep(2);
    } else if (step === 2 && confirmPin.length === PIN_LENGTH) {
      handlePinComplete();
    }
  }, [pin, confirmPin]);

  const renderDots = () => {
    const dots = [];
    const currentPin = step === 1 ? pin : confirmPin;

    for (let i = 0; i < PIN_LENGTH; i++) {
      dots.push(
        <View
          key={i}
          style={[
            styles.dot,
            i < currentPin.length ? styles.filledDot : styles.emptyDot,
          ]}
        />,
      );
    }
    return dots;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>
          {step === 1 ? 'Создайте PIN-код' : 'Подтвердите PIN-код'}
        </Text>
        <Text style={styles.subtitle}>
          {step === 1
            ? 'Придумайте 4-значный PIN-код для защиты вашего приложения'
            : 'Введите PIN-код еще раз для подтверждения'}
        </Text>
      </View>

      <Image
          style={{width: 100, height: 100}}
          source={require('../../assets/images/alpha-cargo.png')}
        />

      <Animated.View
        style={[
          styles.dotsContainer,
          {transform: [{translateX: shakeAnimation}]},
        ]}>
        {renderDots()}
      </Animated.View>

      {errorText ? (
        <Text style={styles.errorText}>{errorText}</Text>
      ) : (
        <View style={styles.spacer} />
      )}

      <View style={styles.keypadContainer}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(number => (
          <TouchableOpacity
            key={number}
            style={styles.numberButton}
            onPress={() => handleNumberPress(number.toString())}>
            <Text style={styles.numberText}>{number}</Text>
          </TouchableOpacity>
        ))}

        <View style={[styles.numberButton, {backgroundColor: 'white'}]} />

        <TouchableOpacity
          style={styles.numberButton}
          onPress={() => handleNumberPress('0')}>
          <Text style={styles.numberText}>0</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.numberButton}
          onPress={handleDeletePress}>
          <Text style={styles.deleteButtonText}>⌫</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.skipButton}
        onPress={() => navigation.replace('MainNavigation')}>
        <Text style={styles.skipText}>Пропустить</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 50,
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 30,
    height: 60,
    marginBottom: 50
  },
  title: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    color: '#555',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 50
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginHorizontal: 10,
  },
  emptyDot: {
    borderWidth: 1,
    borderColor: '#333',
  },
  filledDot: {
    backgroundColor: '#333',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  spacer: {
    height: 56,
  },
  keypadContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: width * 0.8,
    maxWidth: 300,
  },
  numberButton: {
    width: width * 0.2,
    height: width * 0.2,
    maxWidth: 80,
    maxHeight: 80,
    borderRadius: width * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    backgroundColor: '#f0f0f0',
  },
  numberText: {
    color: '#000',
    fontSize: 32,
    fontWeight: '300',
  },
  deleteButtonText: {
    color: '#000',
    fontSize: 28,
    fontWeight: '300',
  },
  skipButton: {
    marginTop: 20,
    padding: 10,
  },
  skipText: {
    color: '#007AFF',
    fontSize: 16,
  },
});

export default PinSetupScreen;
