import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {ButtonCustom} from '../../components/UI/Buttons/Button';
import {useNavigation} from '@react-navigation/native';
import PdfIcon from '../../assets/icons/PdfIcon';

export const ParcelCard = (props: any) => {
  const {oneParcel, download} = props;
  const navigation: any = useNavigation();

  console.log(props, 'this is fuck');

  return (
    <View key={oneParcel?.invoice} style={styles.wrapper}>
      <Text style={styles.mainText}>Номер накладной: {oneParcel?.invoice}</Text>
      <Text style={styles.mainText}>Дата: {oneParcel?.date}</Text>
      <Text style={styles.mainText}>
        Дата погрузки: {oneParcel?.shipment_date}
      </Text>
      <Text style={styles.mainText}>Статус: {oneParcel?.status}</Text>
      <Text style={styles.mainText}>Получатель: {oneParcel?.recipient}</Text>
      <Text style={styles.mainText}>Город: {oneParcel?.city}</Text>
      <Text style={styles.mainText}>Статус: {oneParcel?.status}</Text>
      <Text style={styles.mainText}>Сумма: {oneParcel?.sum}</Text>
      <Text style={styles.mainText}>Вес: {oneParcel?.weight}</Text>
      <Text style={styles.mainText}>Количество: {oneParcel?.quantity}</Text>
      {!oneParcel?.payment && (
        <ButtonCustom
          style={{width: 100, backgroundColor: '#94C325', borderRadius: 23}}
          title="Оплатить"
          onClick={() => navigation.navigate('Payment')}
        />
      )}
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 15,
          right: 0,
          width: 60,
          //   height: 50,
          //   backgroundColor: 'gray',
          //   display: 'flex',
          //   flexDirection: 'column',
          //   justifyContent: 'center',
          //   alignItems: 'center',
          //   borderRadius: 25,
        }}>
        <PdfIcon />
        <Text style={{fontSize: 12, color: 'white'}}>Скачать</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 15,
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    borderRadius: 10,
    width: '100%',
    backgroundColor: '#DF5146',
    position: 'relative',
  },
  mainText: {
    fontSize: 16,
    fontWeight: 700,
    color: 'white',
  },
  secondText: {
    fontSize: 14,
    color: 'white',
  },
});
