import {useEffect, useState} from 'react';
import {SafeAreaView, View, Text, StyleSheet, Linking} from 'react-native';
import {LoginContainer} from '../../../components/Containers/LoginContainer';
import {Input} from '../../../components/UI/Inputs/Input';
import {ButtonCustom} from '../../../components/UI/Buttons/Button';
import {useSingUpStep1Mutation} from '../../../services/auth.service';
import Toast from 'react-native-toast-message';
import Telegram from '../../../assets/svg/Telegram';
import {PhoneNumberInput} from '../../../components/UI/PhoneInput';
import {useNavigation} from '@react-navigation/native';

export default function SignUp() {
  const navigation: any = useNavigation();
  const [SignUp] = useSingUpStep1Mutation();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [fio, setFio] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [fioError, setFioError] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [phoneError, setPhoneError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  const handlePost = async () => {
    setPhoneError('');
    setPasswordError('');
    setEmailError('');
    setFioError('');
    let hasError = false;

    if (!phone) {
      setPhoneError('Пожалуйста, введите номер телефона');
      hasError = true;
    }

    if (!password) {
      setPasswordError('Пожалуйста, введите пароль');
      hasError = true;
    }

    if (!fio) {
      setFioError('Пожалуйста, введите имя');
      hasError = true;
    }

    if (!email) {
      setEmailError('Пожалуйста, введите эл.почту');
      hasError = true;
    }

    if (hasError) return;

    setLoading(true);
    try {
      const response: any = await SignUp({phone, password, fio, email});
      console.log(response, 'this is lox')
      if (response['error']) {
        Toast.show({
          type: 'error',
          text1: 'Ошибка входа',
          text2: response.error.data.message,
          visibilityTime: 3000,
        });
      } else {
        navigation.navigate('Verification', {
          fio: fio,
          email: email,
          password: password,
          phone: phone,
        });
      }
    } catch (error) {}
    setLoading(false);
  };

  const openTelegramBot = async () => {
    const urlApp = 'tg://resolve?domain=alphacargoverify_bot';
    const urlWeb = 'https://t.me/alphacargoverify_bot';

    try {
      const supportedApp = await Linking.canOpenURL(urlApp);
      if (supportedApp) {
        await Linking.openURL(urlApp);
      } else {
        await Linking.openURL(urlWeb);
      }
    } catch (err) {
    }
  };

  useEffect(() => {
    if (phone) setPhoneError('');
    if (password) setPasswordError('');
    if (fio) setFioError('');
    if (email) setEmailError('');
  }, [phone, password, email, fio]);

  return (
    <SafeAreaView>
      <View style={styles.main}>
        <LoginContainer isClose={true} text={'Введите номер телефона'}>
          <Text style={{color: '#000018', fontSize: 13, fontWeight: '400'}}>
            Мы отправим вам код через Телеграм-бота
          </Text>

          <View style={styles.msgWrap}>
            <Input value={fio} onChange={setFio} placeholder="Введите имя" />
            {fioError ? <Text style={styles.errorText}>{fioError}</Text> : null}
          </View>
          <View style={styles.msgWrap}>
            <Input value={email} onChange={setEmail} placeholder="Эл.почта" />
            {emailError ? (
              <Text style={styles.errorText}>{emailError}</Text>
            ) : null}
          </View>
          <View style={styles.msgWrap}>
            <PhoneNumberInput setPhoneNumber={setPhone} />
            {phoneError ? (
              <Text style={styles.errorText}>{phoneError}</Text>
            ) : null}
          </View>
          <View style={styles.msgWrap}>
            <Input
              value={password}
              onChange={setPassword}
              placeholder="Придумайте пароль"
            />
            {passwordError ? (
              <Text style={styles.errorText}>{passwordError}</Text>
            ) : null}
          </View>
          <ButtonCustom
            style={{
              backgroundColor: '#FFFFFF',
              borderColor: '#02447F',
              borderWidth: 1,
            }}
            title={
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                }}>
                <Text style={{color: '#000018'}}>Подписаться на бота</Text>
                <Telegram />
              </View>
            }
            onClick={openTelegramBot}
          />
          <ButtonCustom
            title="Регистрация"
            onClick={handlePost}
            isLoading={loading}
          />
        </LoginContainer>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%',
    backgroundColor: '#02447F',
    paddingHorizontal: 20,
    position: 'relative',
    display: 'flex',
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
  },
  signWrap: {
    position: 'absolute',
    top: 10,
    right: 50,
    padding: 5,
  },
  logWrap: {
    position: 'absolute',
    right: 20,
    top: 15,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
  msgWrap: {
    width: '100%',
  },
});
