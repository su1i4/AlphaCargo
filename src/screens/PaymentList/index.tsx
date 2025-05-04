import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import Back from '../../assets/icons/Back';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../../hooks/useAuth';

export const PaymentList = ({route}: any) => {
  const navigation: any = useNavigation();
  const user = useAuth();
  const [paymentList, setPaymentList] = useState([]);
  const {invoice_number} = route.params;
  const accessToken = user?.accessToken;

  useEffect(() => {
    const fetchPaymentList = async () => {
      const response = await fetch('https://alpha-cargo.kg/api/requisites', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setPaymentList(data);
    };
    fetchPaymentList();
  }, []);

  console.log(paymentList);

  return (
    <View style={{flex: 1, position: 'relative'}}>
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
        <Text
          style={{
            fontSize: 30,
            fontWeight: '700',
            marginTop: 20,
            fontFamily: 'Exo 2',
            color: 'black',
          }}>
          Выберите способ оплаты
        </Text>
      </View>
      <View style={styles.container}>
        {paymentList?.map((item: any) => (
          <TouchableOpacity
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 20,
              borderBottomWidth: 2,
              borderBottomColor: '#E1E1E1',
              paddingVertical: 20,
            }}
            key={item.id}
            onPress={() => {
              navigation.navigate('PaymentOplata', {
                id: item.id,
                invoice_number: invoice_number,
              });
            }}>
            <Image
              source={{uri: `https://alpha-cargo.kg/uploads/${item.logo}`}}
              style={{width: 50, height: 50, borderRadius: 10}}
            />
            <Text
              style={{
                fontSize: 20,
                fontWeight: '700',
                fontFamily: 'Exo 2',
                color: '#000',
              }}>
              {item.header_title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 200,
    paddingHorizontal: 20,
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
  fileButton: {
    marginTop: 10,
    padding: 15,
    backgroundColor: '#ddd',
    borderRadius: 5,
    alignItems: 'center',
  },
  fileButtonText: {
    color: '#333',
  },
});
