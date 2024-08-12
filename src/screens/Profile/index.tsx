import {useState} from 'react';
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
import {useGetUserQuery} from '../../services/auth.service';
import {useAuth} from '../../hooks/useAuth';

export default function Profile() {
  const user = useAuth();
  const {data = {}, isLoading} = useGetUserQuery();
  const [type, setType] = useState();
  const naviagation: any = useNavigation();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [fio, setFio] = useState('');
  const [userData, setUserData] = useState({
    email: '',
    phone: '',
    fio: '',
    createdAt: '',
    updatedAt: '',
  });

  console.log(JSON.stringify(user), 'this is user');

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        id="Profile"
        Left={BellIcon}
        text="Личный кабинет"
        Right={LogoutIcon}
        func={() => naviagation.goBack()}
      />
      <ScrollView style={styles.scrollView}>
        <View style={styles.Wrapper}>
          <TouchableOpacity onPress={() => naviagation.navigate('CalcPrice')}>
            <Panel />
          </TouchableOpacity>
          <Text style={styles.mainText}>Личные данные</Text>
          <Text style={styles.email}>email</Text>
          <Input
            value="value"
            style={{
              backgroundColor: 'white',
              borderWidth: 0,
              borderColor: 'white',
            }}
            onChange={setUserData}
            placeholder=""
          />
          <ButtonCustom
            onClick={() => false}
            isLoading={false}
            title="Редактировать"
          />
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
    // alignItems: 'center',
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
});
