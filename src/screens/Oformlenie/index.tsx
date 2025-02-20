import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../../hooks/useAuth';
import Loading from '../../components/UI/Loading';
import Back from '../../assets/icons/Back';
import MiniLogo from '../../assets/icons/MiniLogo';
import {formatDate} from '../../utils/helpers';

export default function Oformlenie() {
  const user = useAuth();
  const accessToken = user?.accessToken;
  const navigation: any = useNavigation();
  const [notifications, setNotifications] = useState([]);

  return (
    <View style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Back color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Изменить оформление</Text>
      </View>
      <View style={styles.Wrapper}>
        <Text style={{fontFamily: 'Exo 2'}}>
          Скоро эта функция будет доступна
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    position: 'relative',
  },
  header: {
    top: 55,
    position: 'absolute',
    paddingHorizontal: 20,
    zIndex: 99,
  },
  headerText: {
    fontSize: 27,
    fontWeight: '700',
    marginTop: 20,
    fontFamily: 'Exo 2',
  },
  Wrapper: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    alignItems: 'center',
    marginTop: 140,
    fontFamily: 'Exo 2',
  },
});
