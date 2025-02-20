import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Alert,
} from 'react-native';
import Back from '../../assets/icons/Back';
import {useNavigation} from '@react-navigation/native';
import Mark from '../../assets/icons/support/mark';
import Chat from '../../assets/icons/support/chat';

const Help = () => {
  const navigation: any = useNavigation();

  const openMail = async () => {
      try {
        const url = `mailto:alphacargo3003@gmail.com`;
        const supported = await Linking.canOpenURL(url);
        if (supported) {
          await Linking.openURL(url);
        } else {
          Alert.alert('Ошибка', 'Не удалось открыть почтовый клиент');
        }
      } catch (error) {
        Alert.alert('Ошибка', 'Не удалось открыть почтовый клиент');
      }
    };

  return (
    <View style={{flex: 1, position: 'relative'}}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Back color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Поддержка</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.main}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Questions')}
            style={styles.wrap}>
            <Mark />
            <Text style={{fontFamily: 'Exo 2'}}>Часто задаваемые вопросы</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={openMail}
            style={[styles.wrap, {paddingLeft: 4}]}>
            <Chat />
            <Text style={{fontFamily: 'Exo 2'}}>Предложить функционал</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.main, {marginTop: 20}]}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 10,
            }}>
            <Text style={{fontFamily: 'Exo 2'}}>О приложении</Text>
            <Text style={{color: '#666666', fontSize: 15}}>Версия 1.0.2</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    padding: 20,
    marginTop: 150,
  },
  main: {
    width: '100%',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    borderRadius: 10,
    elevation: 4,
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 10,
    paddingVertical: 20,
    gap: 20,
  },
  wrap: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },

  header: {
    top: 60,
    position: 'absolute',
    paddingHorizontal: 20,
    zIndex: 99,
  },
  headerText: {
    fontSize: 30,
    fontWeight: '700',
    marginTop: 20,
    fontFamily: 'Exo 2'
  },
});

export default Help;
