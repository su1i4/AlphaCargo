import {useState} from 'react';
import {SafeAreaView, View, Text, StyleSheet, Image} from 'react-native';
import {LoginContainer} from '../../components/Containers/LoginContainer';
import {Input} from '../../components/UI/Inputs/Input';
import {ButtonCustom} from '../../components/UI/Buttons/Button';
import AuthFooter from '../../components/Auth/AuthFooter';

export default function Login({navigation}:any) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const onClick = () => {
    navigation.navigate('Verification')
  }

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
          <Input
            value={password}
            onChange={setPassword}
            placeholder="Введите пароль..."
          />
          <ButtonCustom
            title="Войти"
            onClick={onClick}
            isLoading={false}
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
  }
});
