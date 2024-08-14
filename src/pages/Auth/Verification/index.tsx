import React, {useRef, useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
} from 'react-native';
import {LoginContainer} from '../../../components/Containers/LoginContainer';
import {ButtonCustom} from '../../../components/UI/Buttons/Button';
import ArrowBack from '../../../assets/icons/ArrowBack';
import {useLoginStep2Mutation} from '../../../services/auth.service';
import Toast from 'react-native-toast-message';
import {useActions} from '../../../hooks/useActions';

export default function Verification({navigation, route}: any) {
  const {fio, email, phone, password} = route.params;
  const [Verification] = useLoginStep2Mutation();
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState<any>(['', '', '', '', '', '']);
  const [errorText, setErrorText] = useState<string>('');
  const inputRefs = useRef<any>([]);
  const [focusedIndex, setFocusedIndex] = useState(0);

  const {saveUser} = useActions();

  const handlePost = async () => {
    const codeRes = Number(code.join(''));

    let hasError = false;

    if (codeRes.toString().length < 6) {
      setErrorText('Пожалуйста, заполните поля');
      hasError = true;
    }

    if (hasError) return;

    setLoading(true);
    try {
      const response: any = await Verification({
        phone: phone,
        password: password,
        fio: fio,
        email: email,
        code: String(codeRes),
      });
      if (response['error']) {
        Toast.show({
          type: 'error',
          text1: 'Ошибка входа',
          text2: response.error.data.message,
        });
      } else {
        saveUser(response.data);
        navigation.navigate('MainNavigation');
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Ошибка Регистраци',
        text2: 'Произошла на сервере',
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);

  const handleCodeChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text.length === 1 && index < 5) {
      setFocusedIndex(index + 1);
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (event: any, index: number) => {
    if (event.nativeEvent.key === 'Backspace' && code[index] === '') {
      if (index > 0) {
        setFocusedIndex(index - 1);
        inputRefs.current[index - 1].focus();
        const newCode = [...code];
        newCode[index - 1] = '';
        setCode(newCode);
      }
    }
  };

  const handleFocus = (index: number) => {
    const lastFilledIndex = code.findLastIndex((digit: any) => digit !== '');
    const newFocusIndex =
      lastFilledIndex === -1 ? 0 : Math.min(lastFilledIndex + 1, 5);

    if (index !== newFocusIndex) {
      inputRefs.current[newFocusIndex].focus();
    }
    setFocusedIndex(newFocusIndex);
  };

  useEffect(() => {
    const codeRes = Number(code.join(''));

    if (codeRes.toString().length > 5) {
      setErrorText('');
    }
  }, [code]);

  return (
    <SafeAreaView>
      <View style={styles.main}>
        <LoginContainer text={'Войти'} isClose={false}>
          <View style={styles.headerTitle}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <ArrowBack size={17} />
            </TouchableOpacity>
            <Text style={styles.text}>
              Введите код отправленный на телеграм бот
            </Text>
          </View>
          <View style={styles.container}>
            {code.map((digit: any, index: any) => (
              <TextInput
                key={index}
                ref={ref => (inputRefs.current[index] = ref)}
                style={styles.input}
                value={digit}
                onChangeText={text => handleCodeChange(text, index)}
                onKeyPress={event => handleKeyPress(event, index)}
                onFocus={() => handleFocus(index)}
                maxLength={1}
                keyboardType="numeric"
              />
            ))}
          </View>
          {errorText ? <Text style={styles.errorText}>{errorText}</Text> : null}
          <ButtonCustom
            disabled={loading}
            title="Войти"
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
  headerTitle: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  text: {
    color: '#000018',
    fontSize: 13,
    fontWeight: '400',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  input: {
    width: 40,
    height: 45,
    borderWidth: 2,
    color: '#000018',
    borderColor: '#94C325',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
});
