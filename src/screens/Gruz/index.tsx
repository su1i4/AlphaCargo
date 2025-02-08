import {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Linking,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Header from '../../screens/Header';
import BellIcon from '../../assets/icons/BellIcon';
import SingleUser from '../../assets/icons/SingleUser';
import {Panel} from '../../screens/Panel';
import {Tab} from '../../components/UI/Tab';
import HandIcon from '../../assets/icons/HandIcon';
import {Personal} from '../../screens/AlphaTabContent/Personal';
import QuesDock from '../../assets/icons/QuesDock';
import Card from '../../assets/icons/Card';
import FaUser from '../../assets/icons/FaUser';
import {useNavigation} from '@react-navigation/native';
import CustomModal from '../../components/UI/Modal';
import CarSvg from '../../assets/svg/CarSvg';
import CarIcon from '../../assets/icons/CarIcon';
import Document from '../../assets/icons/Document';
import RocketIcon from '../../assets/icons/RocketIcon';
import Back from '../../assets/icons/Back';

export default function Gruz() {
  const navigation: any = useNavigation();

  return (
    <View>
      <Header
        id="Alpha"
        text="Официальный груз"
        Left={Back}
        funcLeft={() => navigation.goBack()}
      />
      <ScrollView>
        <View style={styles.Wrapper}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
            }}>
            <View
              style={{
                borderRadius: 10,
                backgroundColor: 'white',
                padding: 10,
                width: '100%',
              }}>
              <View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                  }}>
                  <View
                    style={{
                      padding: 3,
                      backgroundColor: '#E1E1E1',
                      borderRadius: 10,
                    }}>
                    <HandIcon size={20} color="black" />
                  </View>
                  <Text style={{fontSize: 15, fontWeight: 600, color: 'black'}}>
                    Решение любых бизнес-задач
                  </Text>
                </View>
                <Text style={{fontSize: 14, marginTop: 7}}>
                  Коммерческие поставки, хранение, интеграции
                </Text>
              </View>
              <View style={{marginTop: 20}}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                  }}>
                  <View
                    style={{
                      padding: 3,
                      paddingHorizontal: 5,
                      backgroundColor: '#E1E1E1',
                      borderRadius: 10,
                    }}>
                    <CarIcon size={20} color="black" />
                  </View>
                  <Text style={{fontSize: 15, fontWeight: 600, color: 'black'}}>
                    Решение любых бизнес-задач
                  </Text>
                </View>
                <Text style={{fontSize: 14, marginTop: 7}}>
                  По РФ и за рубеж. Курьером, в офисы или постаматы
                </Text>
              </View>
              <View style={{marginTop: 20}}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                  }}>
                  <View
                    style={{
                      padding: 3,
                      backgroundColor: '#E1E1E1',
                      borderRadius: 10,
                    }}>
                    <Document size={20} color="black" />
                  </View>
                  <Text style={{fontSize: 15, fontWeight: 600, color: 'black'}}>
                    Всё для отчетности
                  </Text>
                </View>
                <Text style={{fontSize: 14, marginTop: 7}}>
                  Оплата с расчётного счета и документация
                </Text>
              </View>
              <View style={{marginTop: 20}}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                  }}>
                  <View
                    style={{
                      padding: 3,
                      backgroundColor: '#E1E1E1',
                      borderRadius: 10,
                    }}>
                    <RocketIcon size={20} color="black" />
                  </View>
                  <Text style={{fontSize: 15, fontWeight: 600, color: 'black'}}>
                    Быстрый старт
                  </Text>
                </View>
                <Text style={{fontSize: 14, marginTop: 7}}>
                  Подключение онлайн за несколько минут
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  Wrapper: {
    padding: 20,
    paddingBottom: 40,
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
    marginBottom: '17%',
  },
  titles: {
    color: '#8C8C8C',
    fontSize: 13,
    fontWeight: '400',
  },
  brokeTools: {
    // width: '100%',
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
});
