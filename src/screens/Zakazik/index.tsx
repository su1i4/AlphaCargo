import {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
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
import {useAuth} from '../../hooks/useAuth';
import Back from '../../assets/icons/Back';
import WhiteWhat from '../../assets/icons/WhiteWhat';
import Vyezd from '../../assets/icons/Vyezd';

export default function Zakazik() {
  return (
    <View style={styles.safeArea}>
      <View style={styles.Wrapper}>
        <Text style={{fontSize: 20, fontWeight: '700'}}>
          Контакты выездной группы
        </Text>
        <Text style={{fontSize: 16, fontWeight: '500', paddingVertical: 20}}>
          Тел: +996 (772) 007-183
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: '#A0C417',
            width: '90%',
            paddingBottom: 18,
            paddingTop: 16,
            borderRadius: 20,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 16}}>Открыть WhatsApp</Text>
        </TouchableOpacity>
        <Vyezd />
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
    alignItems: 'center',
  },
});
