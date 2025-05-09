import {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {useGetTariffsQuery} from '../../services/base.service';
import {ButtonCustom} from '../../components/UI/Buttons/Button';
import {Select} from '../../components/UI/Select';
import Back from '../../assets/icons/Back';

export default function Tarif() {
  const {data: Tarifs = []} = useGetTariffsQuery();
  const navigation: any = useNavigation();
  const [countryId, setCountryId] = useState<number | string>(0);
  const [parcel, setParcel] = useState<number | string>(0);
  const [info, setInfo] = useState<any>({day: '', price: ''});
  const [cityId, setCityId] = useState<any>(null);
  const [parcelOption, setParcelOption] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    if (Tarifs.length) {
      setCityId(Tarifs[0].cityTo.id);
    }
  }, [Tarifs]);

  useEffect(() => {
    if (Tarifs.length) {
      const uniqueCities = Tarifs.reduce((acc: any, item: any) => {
        if (!acc.some((city: any) => city.value === item.cityTo.id)) {
          acc.push({label: item.cityTo.cityname, value: item.cityTo.id});
        }
        return acc;
      }, []);

      const uniqueTypes = Tarifs.reduce((acc: any, item: any) => {
        if (!acc.some((type: any) => type.value === item.type.id)) {
          acc.push({label: item.type.name, value: item.type.id});
        }
        return acc;
      }, []);

      setParcelOption(uniqueTypes);
      setCities(uniqueCities);
    }
  }, [Tarifs]);

  const handlePost = async () => {
    const validation = cityId && parcel ? false : true;
    if (validation) {
      Toast.show({
        type: 'error',
        text1: 'Ошибка',
        text2: 'Пожалуйста заполните все поля',
      });
    } else {
      let data = [];
      data = Tarifs.filter(
        (item: any) => item.cityTo.id === cityId && parcel === item.type.id,
      );
      if (data.length) {
        setInfo({day: data[0].deliveryTime, price: data[0].price});
      }
    }
  };

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
            navigation.goBack();
          }}>
          <Back color="black" />
        </TouchableOpacity>
        <Text style={{fontSize: 30, fontWeight: '700', marginTop: 20,fontFamily: 'Exo 2' }}>
          Тарифы
        </Text>
      </View>
      <View style={styles.Wrapper}>
        <View style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
          <Text style={{fontSize: 20, fontWeight: '700', fontFamily: 'Exo 2'}}>
            Узнайте предварительную
          </Text>
          <Text style={{fontSize: 20, fontWeight: '700', marginBottom: 20, fontFamily: 'Exo 2'}}>
            стоимость отправки
          </Text>
        </View>
        {/* <Select
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
        /> */}
        <Select
          onChange={setCityId}
          value={cityId}
          options={Array.from(
            new Map(
              Tarifs.map((item: any) => [item.cityTo.id, item.cityTo]),
            ).values(),
          ).map((item: any, index: number) => ({
            index: index + 1,
            label: item.cityname,
            value: item.id,
          }))}
          placeholder="Город"
          style={{width: '100%'}}
          label="Город"
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
          label="Тип груза"
        />
        {info.day && (
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 10,
            }}>
            <Text style={styles.typeText}>Срок доставки: {info.day} дней</Text>
            <Text style={styles.typeText}>
              Стоимость за киллограмм: {info.price}₽
            </Text>
          </View>
        )}
        <ButtonCustom
          onClick={handlePost}
          title="Рассчитать"
          style={{width: '100%'}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    position: 'relative',
  },
  scrollView: {
    flex: 1,
  },
  Wrapper: {
    width: '100%',
    paddingVertical: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    alignItems: 'flex-start',
    marginTop: 150,
    paddingHorizontal: 20,
  },
  typeText: {
    color: '#000018',
    fontSize: 15,
    fontWeight: '600',
  },
});
