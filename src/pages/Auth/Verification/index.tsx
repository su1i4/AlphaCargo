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
import CodeInput from '../../../components/UI/CodeINput';
import {useLoginStep2Mutation} from '../../../services/auth.service';
import Toast from 'react-native-toast-message';

export default function Verification({navigation, route}: any) {
  // const {phone, password} = route.params;
  const [Verification] = useLoginStep2Mutation();
  const [loading, setLoading] = useState(false);

  const handlePost = async () => {
    setLoading(true);
    try {
      // const response = await Verification({phone, password}).unwrap();
      // console.log(response, 'this is response');
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Ошибка входа',
        text2: 'Пожалуйста, проверьте ваш email и пароль',
      });
    }
    setLoading(false);
  };

  const onClick = () => {
    navigation.navigate('ChangeSignIn');
  };

  const backToLogin = () => {
    navigation.navigate('Login');
  };

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
          <CodeInput />
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
