import {useEffect, useState, useRef} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Input} from '../../../components/UI/Inputs/Input';
import {ButtonCustom} from '../../../components/UI/Buttons/Button';
import {useLoginMutation} from '../../../services/auth.service';
import Toast from 'react-native-toast-message';
import {PhoneNumberInput} from '../../../components/UI/PhoneInput';
import {useNavigation} from '@react-navigation/native';
import {useActions} from '../../../hooks/useActions';
import Back from '../../../assets/icons/Back';
import {LAST_LOGIN_KEY} from '../../../utils/consts';
import {GradientSwitch} from './gradient-switch';

export default function Login({_, route}: any) {
  const {ph = '', pass = ''} = route.params || {};
  const navigation: any = useNavigation();
  const [login] = useLoginMutation();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [phoneError, setPhoneError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const phoneInputRef = useRef<any>();
  const {saveUser} = useActions();

  useEffect(() => {
    if (ph && pass) {
      setPassword(pass);
      setPhone(ph);
    }
  }, [ph, pass]);

  useEffect(() => {
    const loadStoredCredentials = async () => {
      const savedPhone = await AsyncStorage.getItem('SAVED_PHONE');
      const savedPassword = await AsyncStorage.getItem('SAVED_PASSWORD');
      if (savedPhone && savedPassword) {
        setPhone(savedPhone);
        setPassword(savedPassword);
        setRememberMe(true);
      }
    };
    loadStoredCredentials();
  }, []);

  const handlePost = async () => {
    setPhoneError('');
    setPasswordError('');
    let hasError = false;

    if (!phone) {
      setPhoneError('Пожалуйста, введите номер телефона');
      hasError = true;
    }

    if (!password) {
      setPasswordError('Пожалуйста, введите пароль');
      hasError = true;
    }

    if (hasError) return;

    setLoading(true);
    try {
      const response: any = await login({phone, password});
      if (response['error']) {
        Toast.show({
          type: 'error',
          text1: 'Ошибка входа',
          text2: response.error.data.message,
        });
      } else {
        const currentDate = new Date().toISOString();
        await AsyncStorage.setItem(LAST_LOGIN_KEY, currentDate);
        saveUser(response.data);
        navigation.navigate('PinSetupScreen');
        onClose();

        // Сохраняем или очищаем логин/пароль
        if (rememberMe) {
          await AsyncStorage.setItem('SAVED_PHONE', phone);
          await AsyncStorage.setItem('SAVED_PASSWORD', password);
        } else {
          await AsyncStorage.removeItem('SAVED_PHONE');
          await AsyncStorage.removeItem('SAVED_PASSWORD');
        }
      }
    } catch (error) {}
    setLoading(false);
  };

  useEffect(() => {
    if (phone) setPhoneError('');
    if (password) setPasswordError('');
  }, [phone, password]);

  const onClose = () => {
    setPhone('');
    setPassword('');
    if (phoneInputRef.current) {
      phoneInputRef.current.reset();
    }
  };

  return (
    <View style={{flex: 1, position: 'relative'}}>
      <View
        style={{
          top: 80,
          position: 'absolute',
          paddingHorizontal: 20,
          zIndex: 99,
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('Begin')}>
          <Back color="black" />
        </TouchableOpacity>
        <Text style={{fontSize: 30, fontWeight: '700', marginTop: 20}}>
          Войти
        </Text>
      </View>
      <View style={styles.main}>
        <View style={styles.msgWrap}>
          <PhoneNumberInput
            label="Ваш номер телефона"
            setPhoneNumber={setPhone}
            ref={phoneInputRef}
            value={phone}
          />
          {phoneError ? (
            <Text style={styles.errorText}>{phoneError}</Text>
          ) : null}
        </View>
        <View style={styles.msgWrap}>
          <Input
            label="Пароль"
            style={{backgroundColor: 'white'}}
            value={password}
            onChange={setPassword}
            placeholder="Пароль"
            // secureTextEntry
          />
          {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}
        </View>

        <View style={styles.rememberMeWrap}>
          <GradientSwitch value={rememberMe} onValueChange={setRememberMe} />
          <Text style={{marginLeft: 10}}>Запомнить</Text>
        </View>

        <ButtonCustom
          title="Войти"
          onClick={handlePost}
          isLoading={loading}
          style={{width: '100%'}}
        />

        <TouchableOpacity onPress={() => navigation.navigate('Forgot')}>
          <Text style={{textDecorationLine: 'underline', fontFamily: 'Exo 2'}}>
            Не можете войти в ваш профиль?
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 20,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  msgWrap: {
    width: '100%',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
  rememberMeWrap: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
});
