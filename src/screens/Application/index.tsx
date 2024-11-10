import {useEffect, useState, useRef} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Header from '../Header';
import SingleUser from '../../assets/icons/SingleUser';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {useGetTariffsQuery} from '../../services/base.service';
import {ButtonCustom} from '../../components/UI/Buttons/Button';
import {Select} from '../../components/UI/Select';
import {Input} from '../../components/UI/Inputs/Input';
import {PhoneNumberInput} from '../../components/UI/PhoneInput';

export default function Tarif() {
  const {data: Tarifs = []} = useGetTariffsQuery();
  const naviagation: any = useNavigation();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('')
  const phoneInputRef = useRef<any>();

  const handlePost = () => {

  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        id="офсл"
        text="Оформить заявку"
        Right={SingleUser}
        func={() => naviagation.navigate('Profile')}
      />
      <View style={styles.Wrapper}>
        <Input
          style={{width: '100%', paddingBottom: 10, paddingTop: 8}}
          keyboardType
          value={name}
          onChange={setName}
          placeholder="Количество"
        />
        <PhoneNumberInput setPhoneNumber={setPhone} ref={phoneInputRef} />
        <Input
          style={{width: '100%', paddingBottom: 10, paddingTop: 8}}
          keyboardType
          value={date}
          onChange={setDate}
          placeholder="Количество"
        />
        <ButtonCustom
          onClick={handlePost}
          title="Расчитать"
          style={{width: '100%'}}
        />
      </View>
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
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    alignItems: 'center',
  },
  typeText: {
    color: '#000018',
    fontSize: 15,
    fontWeight: '600',
  },
});
