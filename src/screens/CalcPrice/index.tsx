import {useEffect, useState} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import Header from '../Header';
import SingleUser from '../../assets/icons/SingleUser';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {
  useGetAllCitiesQuery,
  useGetAllCountriesQuery,
  useGetBagsQuery,
  useGetParcelTypesQuery,
} from '../../services/base.service';
import {Input} from '../../components/UI/Inputs/Input';
import {Select} from '../../components/UI/Select';
import {ButtonCustom} from '../../components/UI/Buttons/Button';
import { useAuth } from '../../hooks/useAuth';
import Back from '../../assets/icons/Back';

export default function CalcPrice() {
  const user = useAuth();
  const accessToken = user?.accessToken;
  const naviagation: any = useNavigation();

  const {data: Cities = [], isLoading: cityLoading} = useGetAllCitiesQuery();
  const {data: Countries = [], isLoading: countryLoading} =
    useGetAllCountriesQuery();
  const {data: ParcelTypes = []} = useGetParcelTypesQuery();
  const {data: Bags = []} = useGetBagsQuery();

  const [loading, setLoading] = useState<boolean>(false);
  const [fromCities, setFromCities] = useState([]);
  const [toCities, setToCities] = useState([]);
  const [bagId, setBagId] = useState<number | string>(0);
  const [cityFromId, setCityFromId] = useState<number | string>(0);
  const [cityToId, setCityToId] = useState<number | string>(0);
  const [countOfType, setCountOfType] = useState<string>('');
  const [parcelTypeId, setParcelTypeId] = useState<number | string>(0);
  const [weight, setWeight] = useState<string>('');
  const [price, setPrice] = useState<string>('');

  useEffect(() => {
    if (Cities.length) {
      const from = Cities.filter((item: any) => item.type === 'From');
      const to = Cities.filter((item: any) => item.type === 'To');
      setFromCities(from);
      setToCities(to);
    }
  }, [Cities]);

  const handlePost = async () => {
    setLoading(true);
    const validation =
      bagId && cityFromId && cityToId && countOfType && parcelTypeId && weight
        ? false
        : true;
    if (validation) {
      Toast.show({
        type: 'error',
        text1: 'Ошибка',
        text2: 'Пожалуйста заполните все поля',
      });
      setLoading(false)
      return;
    } else {
      try {
        const url = 'https://alpha-cargo.kg/api/calculator';
        const requestBody = {
          cityFromId: cityFromId,
          cityToId: cityToId,
          parcelTypeId: parcelTypeId,
          weight: Number(weight),
          countOfType: Number(countOfType),
          bagId: bagId,
        };
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });
        const data = await response.json();
        setPrice(data)        
      } catch (error) {
        console.error('Fetch error:', error);
      }
    }
    setLoading(false);
  };

  return (
    <View style={styles.safeArea}>
      <Header
        id="Profile"
        text="Рассчитать стоимость"
        Right={SingleUser}
        func={() => naviagation.navigate('Profile')}
        Left={Back}
        funcLeft={() => naviagation.goBack()}
        back
      />
      <View style={styles.Wrapper}>
        <Select
          onChange={setCityFromId}
          value={cityFromId}
          options={fromCities.map((item: any, index: number) => {
            return {
              label: item.cityname,
              value: item.id,
            };
          })}
          placeholder="Откуда"
          style={{width: '100%'}}
        />
        <Select
          onChange={setCityToId}
          value={cityToId}
          options={toCities.map((item: any, index: number) => {
            return {
              label: item.cityname,
              value: item.id,
            };
          })}
          placeholder="Откуда"
          style={{width: '100%'}}
        />
        <Select
          onChange={setParcelTypeId}
          value={parcelTypeId}
          options={ParcelTypes.map((item: any, index: number) => {
            return {
              label: item.name,
              value: item.id,
            };
          })}
          placeholder="Тип посылки"
          style={{width: '100%'}}
        />
        <Select
          onChange={setBagId}
          value={bagId}
          options={Bags.map((item: any, index: number) => {
            return {
              label: item.title,
              value: item.id,
            };
          })}
          placeholder="Тип товара"
          style={{width: '100%'}}
        />
        <Input
          style={{width: '100%', paddingBottom: 10, paddingTop: 8}}
          value={weight}
          onChange={setWeight}
          placeholder="Вес"
        />
        <Input
          style={{width: '100%', paddingBottom: 10, paddingTop: 8}}
          value={countOfType}
          onChange={setCountOfType}
          placeholder="Количество"
        />
        {price && (
          <Text style={{fontSize: 15, color: '#000000', fontWeight: '600'}} >
            Стоимость за кг: {price}₽
          </Text>
        )}
        <ButtonCustom
          onClick={handlePost}
          title="Расчитать"
          isLoading={loading}
          style={{width: '100%'}}
        />
      </View>
    </View>
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
});
