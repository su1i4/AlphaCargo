import {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Header from '../Header';
import SingleUser from '../../assets/icons/SingleUser';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {useGetTariffsQuery} from '../../services/base.service';
import {ButtonCustom} from '../../components/UI/Buttons/Button';
import {Select} from '../../components/UI/Select';

export default function Tarif() {
  const {data: Tarifs = []} = useGetTariffsQuery();
  const naviagation: any = useNavigation();
  const [countryId, setCountryId] = useState<number | string>(0);
  const [cityId, setCityId] = useState<string | number>(0);
  const [parcel, setParcel] = useState<number | string>(0);
  const [info, setInfo] = useState<any>({day: '', price: ''});
  const [parcelOption, setParcelOption] = useState<any>([]);

  useEffect(() => {
    if (Tarifs.length) {
      const names: any = [];
      const arr: any = [];
      Tarifs.filter(
        (item: any) => item.countryId === countryId && item.cityToId === cityId,
      ).map((item: any) => {
        if (!arr.includes(item.type.id)) {
          arr.push(item.type.id);
          names.push({label: item.type.name, value: item.type.id});
        }
      });
      setParcelOption(names)
    }
  }, [countryId, cityId]);

  const handlePost = async () => {
    const validation = cityId && countryId && parcel ? false : true;
    if (validation) {
      Toast.show({
        type: 'error',
        text1: 'Ошибка',
        text2: 'Пожалуйста заполните все поля',
      });
    } else {
        let data = []
      data = Tarifs.filter(
        (item: any) =>
          item.country.id === countryId &&
          item.cityTo.id === cityId &&
          parcel === item.type.id,
      );
      if(data.length){
        setInfo({day: data[0].deliveryTime, price: data[0].price})
      }
    }
  };

  console.log(parcelOption, 'this is tarif');

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        id="офсл"
        text="Тарифы"
        Right={SingleUser}
        func={() => naviagation.navigate('Profile')}
      />
      <View style={styles.Wrapper}>
        <Select
          onChange={setCountryId}
          value={countryId}
          options={Tarifs.map((item: any, index: number) => {
            return {
              index: index + 5,
              label: item.country.countryname,
              value: item.country.id,
            };
          })}
          placeholder="Страна"
          style={{width: '100%'}}
        />
        <Select
          onChange={setCityId}
          value={cityId}
          options={Tarifs.map((item: any, index: number) => {
            return {
              index: index + 5,
              label: item.cityTo.cityname,
              value: item.cityTo.id,
            };
          })}
          placeholder="Город"
          style={{width: '100%'}}
        />
        <Select
          onChange={setParcel}
          value={parcel}
          options={parcelOption.map((item: any, index: number) => {
            return {
                index: index + 1,
              label: item.label,
              value: item.value,
            };
          })}
          placeholder="Тип посылки"
          style={{width: '100%'}}
        />
        {info.day && (
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 10,
            }}>
            <Text style={styles.typeText} >Срок доставки: {info.day} дней</Text>
            <Text style={styles.typeText} >Стоимость за киллограмм: {info.price}₽</Text>
          </View>
        )}
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
