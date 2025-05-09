import {View, Text, StyleSheet, Linking, Alert} from 'react-native';
import {useState} from 'react';
import {InfoContainer} from '../../components/Containers/InfoContainer';
import Percent from '../../assets/icons/Percent';
import HandIcon from '../../assets/icons/HandIcon';
import RocketIcon from '../../assets/icons/RocketIcon';
import SingleUser from '../../assets/icons/SingleUser';
import {useNavigation} from '@react-navigation/native';
import CustomModal from '../../components/UI/Modal';
import Loyal from '../../assets/icons/Loyal';

export const Personal = () => {
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
      }}>
      <CustomModal active={active} onClose={toggleModal} />
      <Text style={styles.titles}>Популярное</Text>
      <InfoContainer
        onClick={() => handleLink('https://www.alpha-cargo.kg/#/cargo')}
        Icon={<Loyal />}
        title="Программа лояльности"
        content="Пользуйтесь услугами и копите баллы"
      />
      <Text style={styles.titles}>Зарабатывай вместе с Альфа</Text>
      <View style={styles.brokeTools}>
        <InfoContainer
          onClick={() => handleLink('https://www.alpha-cargo.kg/#/franchise')}
          Icon={<HandIcon size={18} />}
          title="Франшиза"
          content="Начните свой бизнес"
          width="48.5%"
        />
        <InfoContainer
          onClick={() => handleLink('https://www.alpha-cargo.kg/#/career')}
          Icon={<RocketIcon />}
          title="Работа в Альфа"
          content={`Начни карьеру в \nАльфа Карго`}
          width="48.5%"
        />
      </View>
      <InfoContainer
        onClick={() => handleLink('https://www.alpha-cargo.kg/#/franchise')}
        Icon={<SingleUser size={18} />}
        title="Для франчайзи"
        content="Инструкции и стандарты работы"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  titles: {
    color: '#8C8C8C',
    fontSize: 13,
    fontWeight: '400',
    fontFamily: 'Exo 2'
  },
  brokeTools: {
    // width: '100%',
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
});
