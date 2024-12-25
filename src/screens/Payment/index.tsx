import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Header from '../Header';
import Back from '../../assets/icons/Back';
import {useNavigation} from '@react-navigation/native';
import {Input} from '../../components/UI/Inputs/Input';
import {Tab} from '../../components/UI/Tab';
import {ButtonCustom} from '../../components/UI/Buttons/Button';
import {useLazyFindParcelQuery} from '../../services/base.service';

const Payment = () => {
  const navigation: any = useNavigation();
  const [activeTab, setActiveTab] = useState(0);
  const [parcel, setParcel] = useState('');
  const [findParcel] = useLazyFindParcelQuery();
  const [blockParcel, setBlockParcel] = useState({});
  const [loading, setLoading] = useState(false);

  const handlePost = async () => {
    try {
      setLoading(true);
      const res = await findParcel(parcel);
      if (res.data.Status !== 'Bad, not found') {
        setBlockParcel(res.data);
        setParcel('');
      }
      setLoading(false);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{flex: 1}}>
      <Header
        Left={Back}
        funcLeft={() => navigation.navigate('Alpha')}
        id="questions"
        text="Оплата"
      />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Онлайн оплата услуг</Text>
        </View>
        <View style={{padding: 20}}>
          <Tab text="Плательщик" active={activeTab} setActive={setActiveTab}>
            <View>
              <Text style={{color: '#F9FFFF'}}>Частное лицо</Text>
            </View>
            <View>
              <Text style={{color: '#F9FFFF'}}>Юридическое лицо</Text>
            </View>
          </Tab>
          <Text style={{marginTop: 10, marginBottom: 10}}>Номер накладной</Text>
          <Input
            value={parcel}
            onChange={setParcel}
            placeholder="Введите номер"
          />
          <ButtonCustom
            title="Найти"
            isLoading={loading}
            onClick={handlePost}
            style={{marginTop: 10}}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#E1E1E1',
  },
  headerText: {
    color: 'black',
    fontSize: 17,
    fontWeight: '600',
  },
});

export default Payment;
