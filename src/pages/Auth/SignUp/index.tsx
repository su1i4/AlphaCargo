import {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {LoginContainer} from '../../../components/Containers/LoginContainer';
import {Input} from '../../../components/UI/Inputs/Input';
import {ButtonCustom} from '../../../components/UI/Buttons/Button';
import {useSingUpStep1Mutation} from '../../../services/auth.service';
import Toast from 'react-native-toast-message';
import {PhoneNumberInput} from '../../../components/UI/PhoneInput';
import {useNavigation} from '@react-navigation/native';
import Back from '../../../assets/icons/Back';

export default function SignUp() {
  const navigation: any = useNavigation();
  const [SignUp] = useSingUpStep1Mutation();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [phoneError, setPhoneError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

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
      const response: any = await SignUp({phone});
      if (response['error']) {
        Toast.show({
          type: 'error',
          text1: 'Ошибка входа',
          text2: response.error.data.message,
          visibilityTime: 3000,
        });
      } else {
        navigation.navigate('Verification', {
          password: password,
          phone: phone,
        });
      }
    } catch (error) {}
    setLoading(false);
  };

  useEffect(() => {
    if (phone) setPhoneError('');
    if (password) setPasswordError('');
  }, [phone, password]);

  return (
    <View style={{flex: 1, position: 'relative'}}>
      <View
        style={{
          top: 80,
          position: 'absolute',
          paddingHorizontal: 20,
          zIndex: 99,
          width: '100%',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Back color="black" />
        </TouchableOpacity>
        <Text style={{fontSize: 30, fontWeight: '700', marginTop: 20, fontFamily: 'Exo 2'}}>
          Регистрация
        </Text>
      </View>
      <View style={styles.main}>
        <View style={styles.msgWrap}>
          <PhoneNumberInput
            label="Мы отправим вам код на этот номер"
            setPhoneNumber={setPhone}
          />
          {phoneError ? (
            <Text style={styles.errorText}>{phoneError}</Text>
          ) : null}
        </View>
        <View style={styles.msgWrap}>
          <Input
            label="Придумайте пароль"
            value={password}
            onChange={setPassword}
            placeholder="Пароль"
            style={{backgroundColor: 'white'}}
          />
          {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}
        </View>
        <View style={{width: '100%', position: 'absolute', bottom: 40}}>
          <ButtonCustom
            title="Регистрация"
            onClick={handlePost}
            isLoading={loading}
          />
        </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
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
