import {View, Text, StyleSheet, Linking, Alert} from 'react-native';
import {InfoContainer} from '../../components/Containers/InfoContainer';
import Percent from '../../assets/icons/Percent';
import Calc from '../../assets/icons/Calc';
import Graph from '../../assets/icons/Graph';
import CubeIcon from '../../assets/icons/CubeIcon';
import Document from '../../assets/icons/Document';
import TvIcon from '../../assets/icons/TvIcon';
import HandIcon from '../../assets/icons/HandIcon';
import SingleUser from '../../assets/icons/SingleUser';
import {useNavigation} from '@react-navigation/native';
import CustomModal from '../../components/UI/Modal';
import {useState} from 'react';
import Perevozka from '../../assets/icons/Perevozka';

export const Buisenes = () => {
  const [active, setActive] = useState(false);
  const navigation: any = useNavigation();

  const toggleModal = () => {
    setActive(false);
  };

  const getModal = () => setActive(true);

  const handleLink = async (link: string) => {
    const url = link;
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Ошибка', 'Невозможно открыть ссылку: ' + url);
      }
    } catch (error) {
      Alert.alert('Ошибка', 'Произошла ошибка при попытке открыть ссылку.');
    }
  };

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        marginBottom: 40,
        marginTop: 20,
      }}>
      <CustomModal active={active} onClose={toggleModal} />
      <Text style={styles.titles}>Популярное</Text>
      <View style={styles.brokeTools}>
        <InfoContainer
          onClick={() => navigation.navigate('Tarif')}
          Icon={<Graph />}
          title={`Рассчитать \nтариф`}
          content={`Узнайте срок и \nцену своих \nотправок`}
          width="48.5%"
        />
        <InfoContainer
          onClick={() => navigation.navigate('Loyalty')}
          Icon={<Percent />}
          title={`Программа \nлояльности`}
          content={`Пользуйтесь \nуслугами и копите \nбаллы`}
          width="48.5%"
        />
      </View>
      <View style={styles.brokeTools}>
        <InfoContainer
          onClick={() => navigation.navigate('CalcPrice')}
          Icon={<Calc />}
          title={`Калькулятор`}
          content={`Рассчитайте \nстоимость`}
          width="48.5%"
        />
        <InfoContainer
          onClick={() => handleLink('https://www.alpha-cargo.kg/#/ltl')}
          Icon={<Perevozka />}
          title={`LTL`}
          content={`Перевозка грузов \nдля бизнеса`}
          width="48.5%"
        />
      </View>
      <Text style={styles.titles}>Доставка</Text>
      <View style={styles.brokeTools}>
        <InfoContainer
          onClick={() => handleLink('https://www.alpha-cargo.kg/#/tracking')}
          Icon={<CubeIcon />}
          title={`Отследить \nпосылку`}
          content={`Как оформить \nвозврат товара`}
          width="48.5%"
        />
        <InfoContainer
          onClick={() => navigation.navigate('Gruz')}
          Icon={<Document />}
          title={`Официальный \nгруз`}
          content={`Правила для \nупаковки`}
          width="48.5%"
        />
      </View>
      <Text style={styles.titles}>Зарабатывай вместе с Альфа</Text>
      <View style={styles.brokeTools}>
        <InfoContainer
          onClick={() => navigation.navigate('Franshiza')}
          Icon={<HandIcon size={18} />}
          title={`Франшиза`}
          content={`Начните свой \nбизнес`}
          width="48.5%"
        />
        <InfoContainer
          onClick={() => navigation.navigate('Franshiza')}
          Icon={<SingleUser size={18} />}
          title={`Для франчайзи`}
          content={`Инструкции и\nстандарты рабты`}
          width="48.5%"
        />
      </View>
      <Text style={styles.titles}>Доставка</Text>
      <InfoContainer
        onClick={() => handleLink('https://www.alpha-cargo.kg/#/media')}
        Icon={<TvIcon />}
        title={`Альфа Партнеры`}
        content={`Размещайте рекламу у нас в приложении`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  titles: {
    color: '#8C8C8C',
    fontSize: 13,
    fontWeight: '400',
  },
  brokeTools: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
