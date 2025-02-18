import React, {useRef, useEffect, useState} from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import {ButtonCustom} from '../../../components/UI/Buttons/Button';
import Toast from 'react-native-toast-message';
import {useActions} from '../../../hooks/useActions';
import {TouchableOpacity} from 'react-native';
import Back from '../../../assets/icons/Back';

export default function Verification({navigation, route}: any) {
  const {phone, password} = route.params;
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState<any>(['', '', '', '', '', '']);
  const [errorText, setErrorText] = useState<string>('');
  const inputRefs = useRef<any>([]);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [count, setCount] = useState(60);

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
      const response: any = await fetch(
        'https://alpha-cargo.kg/api/auth/signup-step2',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            phone: phone,
            password: password,
            code: String(codeRes),
          }),
        },
      );
      if (response.status === 201) {
        Toast.show({
          type: 'success',
          text1: 'Успех',
          text2: 'Аккаунт успешно создан войдите',
        });
        navigation.navigate('MainNavigation', {ph: phone, pass: password});
      } else {
        Toast.show({
          type: 'error',
          text1: 'Ошибка входа',
          text2: response.error.data.message,
        });
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

  useEffect(() => {
    setInterval(() => {
      setCount(count - 1);
    }, 1000);
  }, []);

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
      </View>
      <View style={styles.main}>
        <Text
          style={{
            width: '100%',
            fontSize: 30,
            fontWeight: '700',
            marginTop: 20,
          }}>
          Введите код
        </Text>
        <Text style={styles.text}>Код отправлен на {phone}</Text>
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
        <Text
          style={{
            width: '100%',
            fontSize: 16,
            color: '#636363',
          }}>
          Отправить повторно через {count}
        </Text>
        <View style={{width: '100%', position: 'absolute', bottom: 40}}>
          <ButtonCustom
            disabled={loading}
            title="Войти"
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
  headerTitle: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  text: {
    width: '100%',
    color: '#000018',
    fontSize: 16,
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
