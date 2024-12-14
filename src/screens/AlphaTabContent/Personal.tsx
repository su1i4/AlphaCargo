import {View, Text, StyleSheet} from 'react-native';
import {useState} from 'react';
import {InfoContainer} from '../../components/Containers/InfoContainer';
import Percent from '../../assets/icons/Percent';
import HandIcon from '../../assets/icons/HandIcon';
import RocketIcon from '../../assets/icons/RocketIcon';
import SingleUser from '../../assets/icons/SingleUser';
import {useNavigation} from '@react-navigation/native';
import CustomModal from '../../components/UI/Modal';

export const Personal = () => {
  const [active, setActive] = useState(false);
  const navigation: any = useNavigation();

  const toggleModal = () => {
    setActive(false);
  };

  const getModal = () => setActive(true);

  return (
    <>
      <CustomModal active={active} onClose={toggleModal} />
      <Text style={styles.titles}>Популярное</Text>
      <InfoContainer
        onClick={() => navigation.navigate('Loyalty')}
        Icon={<Percent />}
        title="Программа лояльности"
        content="Пользуйтесь услугами и копите баллы"
      />
      <Text style={styles.titles}>Зарабатывай вместе с Альфа</Text>
      <View style={styles.brokeTools}>
        <InfoContainer
          onClick={() => navigation.navigate('Franshiza')}
          Icon={<HandIcon size={18} />}
          title="Франшиза"
          content="Начните свой бизнес"
          width="48.5%"
        />
        <InfoContainer
          onClick={getModal}
          Icon={<RocketIcon />}
          title="Работа в Альфа"
          content={`Начни карьеру в \nАльфа Карго`}
          width="48.5%"
        />
      </View>
      <InfoContainer
        onClick={getModal}
        Icon={<SingleUser size={18} />}
        title="Для франчайзи"
        content="Инструкции и стандарты работы"
      />
    </>
  );
};

const styles = StyleSheet.create({
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
