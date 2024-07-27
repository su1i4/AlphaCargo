import {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {LoginContainer} from '../../components/Containers/LoginContainer';
import {Input} from '../../components/UI/Inputs/Input';
import {ButtonCustom} from '../../components/UI/Buttons/Button';
import AuthFooter from '../../components/Auth/AuthFooter';
import {Sign} from '../../components/sign';
import LoginSign from '../../assets/icons/LoginSign';
import {useLoginStep1Mutation} from '../../services/auth.service';
import Toast from 'react-native-toast-message';

export default function Login({navigation}: any) {
  const [Login] = useLoginStep1Mutation();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState<boolean>(false);
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

  useEffect(() => {
    let timeout: any;
    if (open) {
      timeout = setTimeout(() => setOpen(false), 3000);
    }
    return () => {
      if (timeout && open) {
        clearTimeout(timeout);
      }
    };
  }, [open]);

  const onClose = () => {
    setPhone('');
    setPassword('');
  };

  const onAskCode = () => {
    navigation.navigate('Verification');
  };

  return (
    <SafeAreaView>
      <View style={styles.main}>
        <View style={styles.imageContainer}>
          <Image source={require('../../assets/images/AlphaCargo.png')} />
        </View>
        <LoginContainer isClose={true} text={'Войти'}>
          <Input
            value={phone}
            onChange={setPhone}
            placeholder="Введите логин..."
          />
          <View style={styles.inputWrap}>
            <Input
              value={password}
              onChange={setPassword}
              placeholder="Введите пароль..."
            />
            {open && (
              <TouchableOpacity onPress={onAskCode} style={styles.logWrap}>
                <Sign />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() => {
                setOpen(prev => !prev);
              }}
              style={styles.signWrap}>
              <LoginSign />
            </TouchableOpacity>
          </View>
          <ButtonCustom
            title="Войти"
            onClick={handlePost}
            isLoading={loading}
          />
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
    top: 15,
    right: 20,
    padding: 5,
  },
  logWrap: {
    position: 'absolute',
    right: 20,
    top: -20,
  },
});
