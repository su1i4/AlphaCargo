import React, {useRef, useEffect, useState} from 'react';
import {
  View, 
  StyleSheet, 
  Text, 
  TextInput, 
  KeyboardAvoidingView, 
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView
} from 'react-native';
import {ButtonCustom} from '../../../components/UI/Buttons/Button';
import Toast from 'react-native-toast-message';
import {useActions} from '../../../hooks/useActions';
import {TouchableOpacity} from 'react-native';
import Back from '../../../assets/icons/Back';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useLoginMutation, useSingUpStep1Mutation} from '../../../services/auth.service';
import {LAST_LOGIN_KEY} from '../../../utils/consts';
import {Count} from '../Count.tsx';

export default function Verification({navigation, route}: any) {
  const {phone, password} = route.params;
  const [SignUp] = useSingUpStep1Mutation();
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState<any>(['', '', '', '', '', '']);
  const [login] = useLoginMutation();
  const [errorText, setErrorText] = useState<string>('');
  const inputRefs = useRef<any>([]);
  const [focusedIndex, setFocusedIndex] = useState(0);

  const {saveUser} = useActions();

  const handlePost = async () => {
    // Dismiss keyboard when submitting
    Keyboard.dismiss();
    
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
        const responseLogin: any = await login({phone, password});
        if (responseLogin['error']) {
          Toast.show({
            type: 'error',
            text1: 'Ошибка входа',
            text2: response.error.data.message,
          });
        } else {
          const currentDate = new Date().toISOString();
          await AsyncStorage.setItem(LAST_LOGIN_KEY, currentDate);
          saveUser(responseLogin.data);
          navigation.navigate('MainNavigation');
        }
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
    // Handle case when a longer string is pasted or auto-filled
    if (text.length > 1) {
      // This likely means the entire SMS code was auto-filled
      const codeDigits = text.slice(0, 6).split('');
      
      // Fill the inputs with the digits
      const newCode = [...code];
      for (let i = 0; i < codeDigits.length && i < 6; i++) {
        newCode[i] = codeDigits[i];
      }
      setCode(newCode);
      
      // Move focus to the last filled input or dismiss keyboard if all filled
      if (codeDigits.length >= 6) {
        Keyboard.dismiss();
      } else if (codeDigits.length > 0) {
        const newIndex = Math.min(codeDigits.length, 5);
        setFocusedIndex(newIndex);
        inputRefs.current[newIndex].focus();
      }
    } else {
      // Normal case - single digit entered
      const newCode = [...code];
      newCode[index] = text;
      setCode(newCode);

      // If all inputs are filled, dismiss keyboard
      if (text.length === 1 && index === 5) {
        Keyboard.dismiss();
      } else if (text.length === 1 && index < 5) {
        setFocusedIndex(index + 1);
        inputRefs.current[index + 1].focus();
      }
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

  const handleResend = async () => {
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

  // Dismiss keyboard when tapping outside input
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
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
          
          <ScrollView 
            contentContainerStyle={{flexGrow: 1}}
            keyboardShouldPersistTaps="handled">
            <View style={styles.main}>
              <Text
                style={{
                  width: '100%',
                  fontSize: 30,
                  fontWeight: '700',
                  marginTop: 20,
                  fontFamily: 'Exo 2',
                }}>
                Введите код
              </Text>
              <Text style={[styles.text, {fontFamily: 'Exo 2'}]}>
                Код отправлен на {phone}
              </Text>
              <View style={styles.container}>
                {code.map((digit: any, index: any) => (
                  <TextInput
                    key={index}
                    ref={ref => (inputRefs.current[index] = ref)}
                    style={[styles.input, {fontFamily: 'Exo 2'}]}
                    value={digit}
                    onChangeText={text => handleCodeChange(text, index)}
                    onKeyPress={event => handleKeyPress(event, index)}
                    onFocus={() => handleFocus(index)}
                    maxLength={index === 0 ? 6 : 1}
                    keyboardType="numeric"
                    returnKeyType={index === 5 ? "done" : "next"}
                    blurOnSubmit={index === 5}
                    textContentType="oneTimeCode"
                  />
                ))}
              </View>
              {errorText ? <Text style={styles.errorText}>{errorText}</Text> : null}
              <Count onPress={handleResend} />
              <View style={{width: '100%', marginTop: 30}}>
                <ButtonCustom
                  disabled={loading}
                  title="Войти"
                  onClick={handlePost}
                  isLoading={loading}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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