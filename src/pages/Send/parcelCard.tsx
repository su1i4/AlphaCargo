import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {ButtonCustom} from '../../components/UI/Buttons/Button';
import {useNavigation} from '@react-navigation/native';
import PdfIcon from '../../assets/icons/PdfIcon';

export const ParcelCard = ({oneParcel, getPdf}: any) => {
  const navigation: any = useNavigation();

  return (
    <View
      key={oneParcel?.invoice}
      style={[
        styles.wrapper,
        {
          backgroundColor: oneParcel.payment ? '#94C325' : '#DF5146',
          marginTop: 10,
        },
      ]}>
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
      <TouchableOpacity onPress={() => getPdf(oneParcel?.invoice)}>
        <PdfIcon />
        <Text style={{fontSize: 12, color: 'white'}}>Накладная</Text>
      </TouchableOpacity>
      {oneParcel?.payment ? (
        <View
          style={{
            backgroundColor: '#DE5146',
            width: 100,
            paddingVertical: 3,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
          }}>
          <Text style={{color: 'white', fontSize: 16}}>Оплачено</Text>
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => false}
          style={{
            backgroundColor: '#94C325',
            width: 100,
            paddingVertical: 3,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
          }}>
          <Text style={{color: 'white', fontSize: 16}}>Оплатить</Text>
        </TouchableOpacity>
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
    borderRadius: 26,
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
