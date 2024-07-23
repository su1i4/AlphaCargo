import {useState} from 'react';
import {SafeAreaView, StyleSheet, View, ScrollView, Text} from 'react-native';
import Header from '../../screens/Header';
import SingleUser from '../../assets/icons/SingleUser';
import Calc from '../../assets/icons/Calc';
import CarIcon from '../../assets/icons/CarIcon';
import TarifIcon from '../../assets/icons/TarifIcon';
import {Tab} from '../../components/UI/Tab';

export default function Send() {
  const [activeTab, setActiveTab] = useState(0);
  const [text, setText] = useState('');
  return (
    <SafeAreaView>
      <Header
        id="watchOrder"
        value={text}
        onChange={setText}
        isSearch
        placeholder="Номер посылки"
        text="Отправления"
        Right={SingleUser}
      />
      <ScrollView>
        <View style={styles.Wrapper}>
          <View style={styles.brokeTools}>
            <View style={styles.content}>
              <Calc active />
              <Text style={styles.text}>Рассчитать</Text>
            </View>
            <View style={styles.content}>
              <CarIcon />
              <Text style={styles.text}>{`Вызвать\nвыездную группу`}</Text>
            </View>
          </View>
          <View style={styles.container}>
            <TarifIcon />
            <Text style={{fontSize: 13, fontWeight: '400', color: '#F9FFFF'}}>
              Рассчитать
            </Text>
          </View>
          <Tab
            text="Мои отправления"
            active={activeTab}
            setActive={setActiveTab}>
            <View>
              <Text style={{color: '#F9FFFF'}}>Все</Text>
            </View>
            <View>
              <Text style={{color: '#F9FFFF'}}>Оплаченные</Text>
            </View>
            <View>
              <Text style={{color: '#F9FFFF'}}>Не оплаченные</Text>
            </View>
          </Tab>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Wrapper: {
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
    marginBottom: '17%',
  },
  brokeTools: {
    // width: '100%',
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  content: {
    width: '48.5%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    height: 90,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#8C8C8C',
    fontSize: 13,
    fontWeight: '400',
    textAlign: 'center',
  },
  container: {
    backgroundColor: '#02447F',
    borderRadius: 10,
    height: 97,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
