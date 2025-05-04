import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Vibration,
  SafeAreaView,
  Dimensions,
  Alert,
  Platform,
  Image,
} from 'react-native';
import {PIN_KEY, PIN_KEY_DATE} from '../../utils/consts';
import {useNavigation} from '@react-navigation/native';
import {removeUserFromStorage, updatePinSession} from '../../utils/helpers';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
import FaceId from '../../assets/icons/FaceId';

// Initialize biometrics with proper options
const rnBiometrics = Platform.select({
  ios: () => new ReactNativeBiometrics({allowDeviceCredentials: true}),
  android: () => new ReactNativeBiometrics(),
})?.();

const {width} = Dimensions.get('window');
const PIN_LENGTH = 4;

// Define types for navigation and biometrics
type NavigationProp = {
  navigate: (screen: string) => void;
  replace: (screen: string) => void;
  getCurrentRoute: () => {name: string} | undefined;
  reset: (config: {index: number; routes: Array<{name: string}>}) => void;
};

type BiometricResult = {
  success: boolean;
  error?: string;
};

const PinCodeScreen: React.FC = () => {
  const [pin, setPin] = useState<string>('');
  const [errorText, setErrorText] = useState<string>('');
  const [shakeAnimation] = useState<Animated.Value>(new Animated.Value(0));
  const [storedPin, setStoredPin] = useState<string>('');
  const [biometricType, setBiometricType] = useState<string | null>(null);
  const [biometricAvailable, setBiometricAvailable] = useState<boolean>(false);
  const navigation = useNavigation() as NavigationProp;

  // Check if biometrics are available
  useEffect(() => {
    const checkBiometrics = async (): Promise<void> => {
      try {
        // Проверяем, инициализирован ли rnBiometrics
        if (!rnBiometrics) {
          console.error('ReactNativeBiometrics not initialized');
          return;
        }

        // Safe access to isSensorAvailable
        const biometricResult = await rnBiometrics.isSensorAvailable();
        const available = biometricResult?.available || false;
        const biometryType = biometricResult?.biometryType || null;

        setBiometricAvailable(available);
        setBiometricType(biometryType);

        // If biometrics are available, prompt immediately
        if (available) {
          handleBiometricLogin();
        }
      } catch (error) {
        console.error('Error checking biometrics:', error);
        // Gracefully handle error - don't show biometric options
        setBiometricAvailable(false);
      }
    };

    checkBiometrics();
  }, []);

  // Handle biometric authentication
  const handleBiometricLogin = async (): Promise<void> => {
    try {
      if (!rnBiometrics || !biometricAvailable) {
        return;
      }

      const promptMessage =
        biometricType === BiometryTypes.FaceID
          ? 'Подтвердите Face ID'
          : 'Подтвердите Touch ID';

      const result: BiometricResult = await rnBiometrics.simplePrompt({
        promptMessage,
        cancelButtonText: 'Отмена',
      });

      if (result.success) {
        console.log('Biometric authentication successful');
        await updatePinSession();
        navigation.replace('MainNavigation');
      } else {
        console.log('Biometric authentication failed:', result.error);
      }
    } catch (error) {
      console.error('Error with biometric authentication:', error);
    }
  };

  useEffect(() => {
    if (biometricAvailable) {
      handleBiometricLogin();
    }
  }, [biometricAvailable]);

  // Load the stored PIN when component mounts
  useEffect(() => {
    const getStoredPin = async (): Promise<void> => {
      try {
        const pinFromStorage = await AsyncStorage.getItem(PIN_KEY);
        console.log('Retrieved PIN from storage:', pinFromStorage);
        if (pinFromStorage) {
          setStoredPin(pinFromStorage);
        } else {
          console.log('No PIN found in storage');
          // If no PIN is found, redirect to PIN setup
          navigation.replace('PinSetupScreen');
        }
      } catch (error) {
        console.error('Error retrieving PIN:', error);
      }
    };

    getStoredPin();
  }, [navigation]);

  // Shake animation on error
  const shakeError = (): void => {
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
    Vibration.vibrate(400); // Vibrate to provide haptic feedback
  };

  const handleNumberPress = (number: string): void => {
    if (pin.length < PIN_LENGTH) {
      setPin(prevPin => prevPin + number);
    }
  };

  const handleDeletePress = (): void => {
    setPin(prevPin => prevPin.slice(0, -1));
    setErrorText('');
  };

  useEffect(() => {
    // Check if PIN is complete
    if (pin.length === PIN_LENGTH) {
      // Validate PIN against the one from storage
      if (storedPin && pin === storedPin) {
        setErrorText('');
        // Handle successful authentication
        console.log('PIN correct!');

        // Update PIN session timestamp
        updatePinSession().then(() => {
          // Navigate to the main screen
          navigation.replace('MainNavigation');
        });
      } else {
        setErrorText('Неверный PIN-код. Попробуйте снова.');
        shakeError();
        setPin('');
      }
    }
  }, [pin, storedPin, navigation]);

  const renderDots = (): React.ReactNode[] => {
    const dots: React.ReactNode[] = [];
    for (let i = 0; i < PIN_LENGTH; i++) {
      dots.push(
        <View
          key={i}
          style={[
            styles.dot,
            i < pin.length ? styles.filledDot : styles.emptyDot,
          ]}
        />,
      );
    }
    return dots;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Введите PIN-код</Text>
        <Text style={styles.subtitle}>Введите ваш 4-значный PIN-код</Text>
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

      <View style={{height: 50}}>
        {errorText ? (
          <Text style={styles.errorText}>{errorText}</Text>
        ) : (
          <View style={styles.spacer} />
        )}
      </View>

      <View style={styles.keypadContainer}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(number => (
          <TouchableOpacity
            key={number}
            style={styles.numberButton}
            onPress={() => handleNumberPress(number.toString())}>
            <Text style={styles.numberText}>{number}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          onPress={handleBiometricLogin}
          style={[styles.numberButton]}>
          <FaceId />
        </TouchableOpacity>

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

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.forgotPinButton}
          onPress={async () => {
            await removeUserFromStorage();
            await AsyncStorage.removeItem(PIN_KEY_DATE);
            await AsyncStorage.removeItem(PIN_KEY);
            navigation.navigate('Login');
          }}>
          <Text style={styles.forgotPinText}>Выйти</Text>
        </TouchableOpacity>
      </View>
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
    marginBottom: 30
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
  bottomContainer: {
    alignItems: 'center',
    marginTop: 10,
    // display: 'flex',
    // flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  biometricButton: {
    padding: 10,
    marginBottom: 10,
  },
  biometricText: {
    color: '#007AFF',
    fontSize: 16,
  },
  forgotPinButton: {
    padding: 10,
  },
  forgotPinText: {
    color: '#007AFF',
    fontSize: 16,
  },
});

export default PinCodeScreen;
