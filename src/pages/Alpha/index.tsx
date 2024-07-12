import {useState} from 'react';
import {SafeAreaView, View, StyleSheet, Text} from 'react-native';
import Header from '../../screens/Header';
import BellIcon from '../../assets/icons/BellIcon';
import SingleUser from '../../assets/icons/SingleUser';
import {Panel} from '../../screens/Panel';
import {Tab} from '../../components/UI/Tab';
import HandIcon from '../../assets/icons/HandIcon';

export default function Alpha() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <SafeAreaView>
      <Header Left={BellIcon} text="Мой Альфа" Right={SingleUser} />
      <View style={styles.Wrapper}>
        <Panel />
        <Tab text="Сервисы" active={activeTab} setActive={setActiveTab}>
          <View>
            <SingleUser size={19} />
            <Text style={{color: '#F9FFFF'}}>Частным клиентам</Text>
          </View>
          <View>
            <HandIcon size={19} />
            <Text style={{color: '#F9FFFF'}}>Бизнесу</Text>
          </View>
        </Tab>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Wrapper: {
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
  },
});
