import {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {LoginContainer} from '../../../components/Containers/LoginContainer';
import {Input} from '../../../components/UI/Inputs/Input';
import {ButtonCustom} from '../../../components/UI/Buttons/Button';
import AuthFooter from '../../../components/Auth/AuthFooter';
import {
  useLoginStep1Mutation,
  useLoginStep2Mutation,
} from '../../../services/auth.service';
import Toast from 'react-native-toast-message';
import TelegramBlack from '../../../assets/svg/TelegramBlack';
import Telegram from '../../../assets/svg/Telegram';
import {PhoneNumberInput} from '../../../components/UI/PhoneInput';
import {useNavigation} from '@react-navigation/native';
import {useActions} from '../../../hooks/useActions';

export default function Login() {
  const navigation: any = useNavigation();
  const [login] = useLoginStep1Mutation();
  const [login2] = useLoginStep2Mutation();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [phoneError, setPhoneError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  const {saveUser} = useActions();

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
    if (!code) {
      try {
        const response: any = await login({phone, password});
        if (response['error']) {
          console.log(response);
          Toast.show({
            type: 'error',
            text1: 'Ошибка входа',
            text2: response.error.data.message,
          });
        }
      } catch (error) {}
    } else {
      try {
        const response: any = await login2({phone, password, code});
        if (response['error']) {
          console.log(response);
          Toast.show({
            type: 'error',
            text1: 'Ошибка входа',
            text2: response.error.data.message,
          });
        } else {
          console.log(response.data, 'this is repsonse')
          saveUser(response.data)
          navigation.navigate('MainNavigation')
        }
        onClose();
      } catch (error) {}
    }
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
      console.error('An error occurred', err);
    }
  };

  useEffect(() => {
    if (phone) setPhoneError('');
    if (password) setPasswordError('');
  }, [phone, password]);

  const onClose = () => {
    setPhone('');
    setPassword('');
  };

  return (
    <SafeAreaView>
      <View style={styles.main}>
        <View style={styles.imageContainer}>
          <Image source={require('../../../assets/images/AlphaCargo.png')} />
        </View>
        <LoginContainer isClose={true} text={'Войти'}>
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
              placeholder="Пароль"
            />
            {passwordError ? (
              <Text style={styles.errorText}>{passwordError}</Text>
            ) : null}
          </View>
          <View style={styles.inputWrap}>
            <Input value={code} onChange={setCode} placeholder="Код" />
            <TouchableOpacity onPress={handlePost} style={styles.signWrap}>
              <TelegramBlack />
            </TouchableOpacity>
            <TouchableOpacity onPress={openTelegramBot} style={styles.logWrap}>
              <Telegram />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <ButtonCustom
              title="Войти"
              onClick={handlePost}
              isLoading={loading}
              style={{width: '47%'}}
            />
            <ButtonCustom
              title="Регистрация"
              onClick={() => navigation.navigate('SignUp')}
              isLoading={false}
              style={{width: '47%'}}
            />
          </View>
        </LoginContainer>
      </View>
      <AuthFooter />
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
