import {useState, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import Header from '../Header';
import BellIcon from '../../assets/icons/BellIcon';
import LogoutIcon from '../../assets/icons/LogoutIcon';
import {useNavigation} from '@react-navigation/native';
import {Panel} from '../Panel';
import {ButtonCustom} from '../../components/UI/Buttons/Button';
import {Input} from '../../components/UI/Inputs/Input';
import {useAuth} from '../../hooks/useAuth';
import Loading from '../../components/UI/Loading';
import Toast from 'react-native-toast-message';
import {removeUserFromStorage} from '../../utils/helpers';
import Back from '../../assets/icons/Back';
import ProfileUser from '../../assets/icons/ProfileUser';

export default function Profile() {
  const user = useAuth();
  const accessToken = user?.accessToken;
  const [type, setType] = useState(false);
  const naviagation: any = useNavigation();
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [fio, setFio] = useState('');
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [pacthLoad, setPatchLoad] = useState(false);

  useEffect(() => {
    if (type) {
      setType(false);
    }
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch('https://alpha-cargo.kg/api/users', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      if (data) {
        setEmail(data.email);
        setFio(data.fio);
        setPhone(data.phone);
        setId(data.id);
      }
    } catch (err: any) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchNotifications();
    } else {
      setLoading(false);
    }
  }, [accessToken]);

  const handlePost = async (updateData: any) => {
    if (!accessToken) {
      console.error('No access token available');
      return;
    }
    setPatchLoad(true);

    try {
      const response = await fetch('https://alpha-cargo.kg/api/users', {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      if (data['error']) {
        Toast.show({
          type: 'error',
          text1: 'Ошибка входа',
          text2: data?.error?.data?.message,
          visibilityTime: 3000,
        });
      } else {
        Toast.show({
          type: 'success',
          text1: 'Успеx',
          text2: 'Успешное обновление личных данных',
          visibilityTime: 3000,
        });
        setType(false);
        fetchNotifications();
      }
    } catch (err) {
      console.error('Error updating user data:', err);
    }
    setPatchLoad(false);
  };

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      const response = await fetch(
        'https://alpha-cargo.kg/api/users/deactivateUser',
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );

      if (response?.status === 200) {
        Toast.show({
          type: 'success',
          text1: 'Успеx',
          text2: 'Успешное удаление аккаунта',
          visibilityTime: 3000,
        });
        removeUserFromStorage();
        naviagation.navigate('Login');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Ошибка',
          text2: 'Ошибка удаления',
          visibilityTime: 3000,
        });
      }
    } catch (e: any) {
    } finally {
      setDeleteLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchNotifications();
    } else {
      setLoading(false);
    }
  }, [accessToken]);

  return (
    <View style={styles.safeArea}>
      <View
        style={{
          top: 55,
          position: 'absolute',
          paddingHorizontal: 20,
          zIndex: 99,
        }}>
        <TouchableOpacity
          onPress={() => {
            naviagation.goBack();
          }}>
          <Back color="black" />
        </TouchableOpacity>
        <Text style={{fontSize: 30, fontWeight: '700', marginTop: 20, fontFamily: 'Exo 2'}}>
          Личный кабинет{' '}
        </Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={!loading ? styles.Wrapper : styles.loadWrap}>
          {loading ? (
            <Loading />
          ) : (
            <View style={{display: 'flex', flexDirection: 'column', gap: 20}}>
              {/* <TouchableOpacity
                onPress={() => naviagation.navigate('CalcPrice')}>
                <Panel />
              </TouchableOpacity>
              <Text style={styles.mainText}>Личные данные</Text> */}
              <View style={{alignSelf: 'center'}}>
                <View style={{alignSelf: 'center'}}>
                  <ProfileUser />
                </View>
                <Text style={{fontSize: 18, marginTop: 10, fontFamily: 'Exo 2'}}>{phone}</Text>
              </View>
              {type && (
                <View
                  style={{display: 'flex', flexDirection: 'column', gap: 10}}>
                  <Input
                    value={fio}
                    style={{
                      backgroundColor: '#E1E1E1',
                      borderWidth: 0,
                      borderColor: 'white',
                    }}
                    onChange={setFio}
                    placeholder=""
                  />
                  <Input
                    value={phone}
                    style={{
                      backgroundColor: '#E1E1E1',
                      borderWidth: 0,
                      borderColor: 'white',
                    }}
                    onChange={setPhone}
                    placeholder=""
                  />
                  <Input
                    value={password}
                    style={{
                      backgroundColor: 'white',
                      borderWidth: 0,
                      borderColor: 'white',
                    }}
                    onChange={setPassword}
                    placeholder=""
                  />
                </View>
              )}
              <Text style={styles.email}>email</Text>
              <Input
                value={email}
                style={{
                  backgroundColor: '#F0F1F3',
                  borderWidth: 0,
                  borderColor: 'white',
                }}
                // disbaled={true}
                onChange={setEmail}
                placeholder=""
              />
              <View style={{display: 'flex', flexDirection: 'row', gap: 10}}>
                <ButtonCustom
                  onClick={() => {
                    !type
                      ? setType(true)
                      : handlePost({
                          fio: fio,
                          phone: phone,
                          password: password,
                        });
                  }}
                  isLoading={pacthLoad}
                  style={{width: '80%'}}
                  title={!type ? 'Редактировать' : 'Сохранить'}
                />
                <TouchableOpacity
                  style={{
                    width: '18%',
                    backgroundColor: '#F0F1F3',
                    paddingTop: 12,
                    paddingBottom: 14,
                    paddingHorizontal: 10,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    removeUserFromStorage();
                    naviagation.reset({
                      index: 0, // Устанавливаем индекс в 0, чтобы это был первый экран
                      routes: [{ name: 'Login' }], // Указываем маршрут, на который нужно перейти
                    });
                  }}>
                  <LogoutIcon color='black' size={20} />
                </TouchableOpacity>
              </View>
              <ButtonCustom
                onClick={handleDelete}
                isLoading={deleteLoading}
                style={{backgroundColor: 'transparent'}}
                title="Удалить аккаунт"
                loadingColor="red"
              />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'white',
  },
  scrollView: {
    flex: 1,
    marginTop: 150,
    zIndex: 9999,
    padding: 20,
  },
  Wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  loadWrap: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 550,
  },
  mainText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Exo 2'
  },
  email: {
    color: '#000018',
    fontSize: 13,
    fontWeight: '400',
    fontFamily: 'Exo 2'
  },
  delete: {color: 'red', width: '100%', textAlign: 'center'},
});
