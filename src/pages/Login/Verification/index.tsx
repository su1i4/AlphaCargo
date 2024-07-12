import {useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import {LoginContainer} from '../../../components/Containers/LoginContainer';
import {ButtonCustom} from '../../../components/UI/Buttons/Button';
import ArrowBack from '../../../assets/icons/ArrowBack';

export default function Verification({navigation}: any) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const onClick = () => {
    navigation.navigate('ChangeSignIn');
  };

  const backToLogin = () => {
    navigation.navigate('Login');
  }

  return (
    <SafeAreaView>
      <View style={styles.main}>
        <View style={styles.imageContainer}>
          {/* <Image source={require('../../assets/images/AlphaCargo.png')} /> */}
        </View>
        <LoginContainer text={'Войти'} isClose={false}>
          <View style={styles.headerTitle}>
            <TouchableOpacity onPress={onClick}>
              <ArrowBack size={17} />
            </TouchableOpacity>
            <Text style={styles.text}>Код отправлен на +77772146644</Text>
          </View>
          <ButtonCustom title="Войти" onClick={onClick} isLoading={false} />
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
});
