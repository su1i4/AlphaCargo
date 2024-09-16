import {useState, useEffect} from 'react';
import {
  SafeAreaView,
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
import { removeUserFromStorage } from '../../utils/helpers';

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
      const response = await fetch(
        'https://alphacargoserver.azurewebsites.net/users',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );

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
      const response = await fetch(
        'https://alphacargoserver.azurewebsites.net/users',
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updateData),
        },
      );

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
        'https://alphacargoserver.azurewebsites.net/users/deactivateUser',
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );

      if(response?.status === 200){
        Toast.show({
          type: 'success',
          text1: 'Успеx',
          text2: 'Успешное удаление аккаунта',
          visibilityTime: 3000,
        });
        removeUserFromStorage()
        naviagation.navigate('Login')
      }else{
        Toast.show({
          type: 'error',
          text1: 'Ошибка',
          text2: 'Ошибка удаления',
          visibilityTime: 3000,
        });
      }
    } catch (e: any) {
      console.log(e, 'this is error delete');
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
    <SafeAreaView style={styles.safeArea}>
      <Header
        id="Profile"
        Left={BellIcon}
        text="Личный кабинет"
        Right={LogoutIcon}
        func={() => naviagation.goBack()}
        funcLeft={() => naviagation.navigate('Notifications')}
      />
      <ScrollView style={styles.scrollView}>
        <View style={!loading ? styles.Wrapper : styles.loadWrap}>
          {loading ? (
            <Loading />
          ) : (
            <>
              <TouchableOpacity
                onPress={() => naviagation.navigate('CalcPrice')}>
                <Panel />
              </TouchableOpacity>
              <Text style={styles.mainText}>Личные данные</Text>
              {type && (
                <>
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
                </>
              )}
              <Text style={styles.email}>email</Text>
              <Input
                value={email}
                style={{
                  backgroundColor: 'white',
                  borderWidth: 0,
                  borderColor: 'white',
                }}
                disbaled={true}
                onChange={setEmail}
                placeholder=""
              />
              <ButtonCustom
                onClick={() => {
                  !type
                    ? setType(true)
                    : handlePost({fio: fio, phone: phone, password: password});
                }}
                isLoading={pacthLoad}
                title={!type ? 'Редактировать' : 'Сохранить'}
              />
              <ButtonCustom
                onClick={handleDelete}
                isLoading={deleteLoading}
                textStyle={{color: 'red'}}
                style={{backgroundColor: 'transparent'}}
                title="Удалить аккаунт"
                loadingColor="red"
              />
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  Wrapper: {
    paddingHorizontal: 20,
    paddingVertical: 20,
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
  },
  email: {
    color: '#000018',
    fontSize: 13,
    fontWeight: '400',
  },
  delete: {color: 'red', width: '100%', textAlign: 'center'},
});
