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
import {LAST_LOGIN_KEY} from '../../../utils/consts';
import Back from '../../../assets/icons/Back';

export default function Reset({_, route}: any) {
  const {ph = '', pass = ''} = route.params || {};
  const navigation: any = useNavigation();
  const [login] = useLoginMutation();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
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
        navigation.navigate('MainNavigation');
        onClose();
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
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Back color="black" />
        </TouchableOpacity>
        <Text style={{fontSize: 30, fontWeight: '700', marginTop: 20}}>
          Введите ваш номер
        </Text>
        <Text style={{fontSize: 30, fontWeight: '700'}}>телефона</Text>
      </View>
      <View style={styles.main}>
        <View style={styles.msgWrap}>
          <PhoneNumberInput
            label="Мы отправим вам код на этот номер"
            setPhoneNumber={setPhone}
            ref={phoneInputRef}
          />
          {phoneError ? (
            <Text style={styles.errorText}>{phoneError}</Text>
          ) : null}
        </View>
        <View style={styles.msgWrap}>
          <Input
            style={{backgroundColor: 'white'}}
            value={password}
            onChange={setPassword}
            label="Придумайте пароль"
            placeholder="Придумайте пароль"
          />
          {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}
        </View>
        <ButtonCustom
          title="Регистрация"
          onClick={handlePost}
          isLoading={loading}
          style={{width: '100%'}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%',
    // backgroundColor: '#02447F',
    paddingHorizontal: 20,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '25%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  inputWrap: {
    position: 'relative',
    height: 55,
    minHeight: 55,
    maxHeight: 55,
  },
  signWrap: {
    position: 'absolute',
    top: 0,
    right: 50,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
  },
  logWrap: {
    position: 'absolute',
    top: 0,
    right: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
  msgWrap: {
    width: '100%',
  },
});
