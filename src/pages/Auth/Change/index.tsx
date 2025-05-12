import {useEffect, useState, useRef} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {ButtonCustom} from '../../../components/UI/Buttons/Button';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import {useActions} from '../../../hooks/useActions';
import {LAST_LOGIN_KEY} from '../../../utils/consts';
import Back from '../../../assets/icons/Back';
import {useResetPasswordMutation} from '../../../services/base.service';
import {Input} from '../../../components/UI/Inputs/Input';

export default function Change({_, route}: any) {
  const {phone} = route.params;
  const navigation: any = useNavigation();
  const [resetPassword] = useResetPasswordMutation();
  const [code, setCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [phoneError, setPhoneError] = useState<string>('');
  const [codeError, setCodeError] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const phoneInputRef = useRef<any>();

  const {saveUser} = useActions();

  const handlePost = async () => {
    setPhoneError('');
    let hasError = false;

    if (!phone) {
      setPhoneError('Пожалуйста, введите номер телефона');
      hasError = true;
    }

    if (hasError) return;

    setLoading(true);
    try {
      const response: any = await resetPassword({phone, code, password});
      console.log(response, phone, code, password);
      if (response['error']) {
        Toast.show({
          type: 'error',
          text1: 'Ошибка смены пароля',
          text2: response.error.data.message,
        });
      } else {
        navigation.reset({
          index: 0, // Устанавливаем индекс в 0, чтобы это был первый экран
          routes: [{name: 'Login'}], // Указываем маршрут, на который нужно перейти
        });
      }
    } catch (error) {}
    setLoading(false);
  };

  useEffect(() => {
    if (phone) setPhoneError('');
  }, [phone]);

  const onClose = () => {
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
        <Text
          style={{
            fontSize: 30,
            fontWeight: '700',
            marginTop: 20,
            fontFamily: 'Exo 2',
          }}>
          Восстановление
        </Text>
        <Text style={{fontSize: 30, fontWeight: '700', fontFamily: 'Exo 2'}}>
          пароля
        </Text>
      </View>
      <View style={styles.main}>
        <View style={styles.msgWrap}>
          <Input
            label="Введите код"
            onChange={setCode}
            value={code}
            placeholder="Введите код"
          />

          {codeError ? <Text style={styles.errorText}>{codeError}</Text> : null}
        </View>
        <View style={styles.msgWrap}>
          <Input
            label="Введите новый пароль"
            onChange={setPassword}
            value={password}
            placeholder="Введите новый пароль"
          />

          {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}
        </View>
        <ButtonCustom
          title="Сменить пароль"
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
