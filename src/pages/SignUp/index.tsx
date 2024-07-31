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
import {LoginContainer} from '../../components/Containers/LoginContainer';
import {Input} from '../../components/UI/Inputs/Input';
import {ButtonCustom} from '../../components/UI/Buttons/Button';
import AuthFooter from '../../components/Auth/AuthFooter';
import {Sign} from '../../components/sign';
import LoginSign from '../../assets/icons/LoginSign';
import {useLoginStep1Mutation} from '../../services/auth.service';
import Toast from 'react-native-toast-message';
import TelegramBlack from '../../assets/svg/TelegramBlack';
import Telegram from '../../assets/svg/Telegram';
import { PhoneNumberInput } from '../../components/UI/PhoneInput';

export default function SignUp({navigation}: any) {
  const [typeAuth, setTypeAuth] = useState('login');
  const [Login] = useLoginStep1Mutation();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  const handlePost = async () => {
    setLoading(true);
    try {
      const response = await Login({phone, password}).unwrap();
      console.log(response, 'this is response');
      onClose();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Ошибка входа',
        text2: 'Пожалуйста, проверьте ваш email и пароль',
      });
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

  const onClose = () => {
    setPhone('');
    setPassword('');
  };

  return (
    <SafeAreaView>
      <View style={styles.main}>
        <View style={styles.imageContainer}>
          <Image source={require('../../assets/images/AlphaCargo.png')} />
        </View>
        <LoginContainer isClose={true} text={'Войти'}>
          <PhoneNumberInput />
          <Input value={phone} onChange={setPhone} placeholder="Пароль" />
          <View style={styles.inputWrap}>
            <Input value={password} onChange={setPassword} placeholder="Код" />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ChangeSignIn')
              }}
              style={styles.signWrap}>
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
              title="Регистриция"
              onClick={handlePost}
              isLoading={loading}
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
});
