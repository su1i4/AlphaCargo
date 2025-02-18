import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {ButtonCustom} from '../../../components/UI/Buttons/Button';
import {useNavigation} from '@react-navigation/native';
import Back from '../../../assets/icons/Back';

export default function Forgot() {
  const navigation: any = useNavigation();

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
            lineHeight: 35,
          }}>
          Я не помню пароль для
        </Text>
        <Text style={{fontSize: 30, fontWeight: '700', lineHeight: 35}}>
          входа в профиль
        </Text>
      </View>
      <View style={styles.main}>
        <Text style={{color: '#636363', fontSize: 16}}>
          Если вы вышли из своего профиля и не можете вспомнить свой пароль, мы{' '}
          <Text style={{color: 'black', fontWeight: '700'}}>
            можем отправить вам код со ссылкой для сброса пароля в сообщения по
            номеру телефона.
          </Text>
        </Text>
        <Text
          style={{
            width: '100%',
            color: '#636363',
            fontSize: 16,
            textAlign: 'left',
          }}>
          Если вы не получили код, вот наиболее распространённые причины этого,
          и что делать чтобы это исправить.
        </Text>
        <View
          style={{
            width: '100%',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            gap: 5,
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 10,
              alignItems: 'center',
              justifyContent: 'flex-start',
              width: '100%',
            }}>
            <View
              style={{
                backgroundColor: '#636363',
                width: 5,
                height: 5,
                borderRadius: 5,
              }}></View>
            <Text style={{fontSize: 16, lineHeight: 15}}>
              Указали неверный номер телефона.
            </Text>
          </View>
          <Text
            style={{
              width: '100%',
              color: '#636363',
              fontSize: 16,
              textAlign: 'left',
            }}>
            Попробуйте еще раз с тем номером телефона, который вы используете
            для Альфа Карго.
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            gap: 5,
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 10,
              alignItems: 'center',
              justifyContent: 'flex-start',
              width: '100%',
            }}>
            <View
              style={{
                backgroundColor: '#636363',
                width: 5,
                height: 5,
                borderRadius: 5,
              }}></View>
            <Text style={{fontSize: 16, lineHeight: 15}}>
               Вы неправильно написали номер
            </Text>
          </View>
          <Text
            style={{
              width: '100%',
              color: '#636363',
              fontSize: 16,
              textAlign: 'left',
            }}>
            телефона. Пожалуйста, дважды проверьте номер на наличие опечаток и
            исправлений
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            gap: 5,
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 10,
              alignItems: 'center',
              justifyContent: 'flex-start',
              width: '100%',
            }}>
            <View
              style={{
                backgroundColor: '#636363',
                width: 5,
                height: 5,
                borderRadius: 5,
              }}></View>
            <Text style={{fontSize: 16, lineHeight: 15}}>
              Вы письмо находится в другом ящике.
            </Text>
          </View>
          <Text
            style={{
              width: '100%',
              color: '#636363',
              fontSize: 16,
              textAlign: 'left',
            }}>
            Убедитесь, что вы проверили правильный почтовый ящик, который вы
            указали, а также, пожалуйста, проверьте папку со спамом.
          </Text>
        </View>
        <View style={{width: '100%', position: 'absolute', bottom: 40}}>
          <ButtonCustom
            title="Восстановите пароль"
            onClick={() => navigation.navigate('Reset')}
            style={{width: '100%'}}
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
