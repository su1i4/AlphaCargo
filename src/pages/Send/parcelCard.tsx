import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {ButtonCustom} from '../../components/UI/Buttons/Button';
import {useNavigation} from '@react-navigation/native';
import PdfIcon from '../../assets/icons/PdfIcon';

export const ParcelCard = ({oneParcel, getPdf}: any) => {
  const navigation: any = useNavigation();

  return (
    <View key={oneParcel?.invoice} style={[styles.wrapper, {backgroundColor: oneParcel.payment ? '#94C325' : '#DF5146', marginTop: 10}]}>
      <Text style={styles.mainText}>Номер накладной: {oneParcel?.invoice}</Text>
      <Text style={styles.secondText}>Дата: {oneParcel?.date}</Text>
      <Text style={styles.secondText}>Статус: {oneParcel?.status}</Text>
      {!oneParcel?.payment && (
        <ButtonCustom
          style={{width: 100, backgroundColor: '#94C325', borderRadius: 23}}
          title="Оплатить"
          onClick={() => navigation.navigate('Payment')}
        />
      )}
      <TouchableOpacity
        onPress={() => getPdf(oneParcel?.invoice)}
        style={{
        }}>
        <PdfIcon />
        <Text style={{fontSize: 12, color: 'white'}}>Скачать накладную</Text>
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
    position: 'relative',
  },
  mainText: {
    fontSize: 15,
    fontWeight: '700',
    color: 'white',
  },
  secondText: {
    fontSize: 15,
    color: 'white',
  },
});
