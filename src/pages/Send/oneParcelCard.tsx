import {StyleSheet, View, Text} from 'react-native';
import {ButtonCustom} from '../../components/UI/Buttons/Button';
import {useNavigation} from '@react-navigation/native';

export const OneParcelCard = (props: any) => {
  const {oneParcel} = props;
  const navigation: any = useNavigation();
  console.log(oneParcel)
  return (
    <View style={styles.wrapper}>
      <Text style={styles.mainText}>Номер накладной: {oneParcel?.invoice}</Text>
      <Text style={styles.mainText}>Дата: {oneParcel?.date}</Text>
      <Text style={styles.mainText}>
        Дата погрузки: {oneParcel?.shipment_date}
      </Text>
      <Text style={styles.mainText}>Статус: {oneParcel?.status}</Text>
      <Text style={styles.mainText}>Получатель: {oneParcel?.recipient}</Text>
      <Text style={styles.mainText}>Город: {oneParcel?.city}</Text>
      <Text style={styles.mainText}>Статус: {oneParcel?.status}</Text>
      <Text style={styles.mainText}>Вес: {oneParcel?.weight}</Text>
      <Text style={styles.mainText}>Количество: {oneParcel?.quantity}</Text>
      {!oneParcel?.payment && (
        <ButtonCustom
          style={{width: 100, backgroundColor: '#94C325', borderRadius: 23}}
          title="Оплатить"
          onClick={() => navigation.navigate('Payment')}
        />
      )}
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
