import {SafeAreaView, ScrollView, StyleSheet, View, Text} from 'react-native';
import Header from '../../screens/Header';
import BellIcon from '../../assets/icons/BellIcon';
import SingleUser from '../../assets/icons/SingleUser';
import {GradientWrapper} from '../../components/Containers/WatchOrderHeader';

export default function WatchOrder() {
  const Components = [
    {color: '#FF8A8A', text: 'Хранение товара'},
    {color: '#495665', text: 'Бесплатная доставка'},
    {color: '#604C79', text: 'О нашей команде'},
    {color: '#7ABBA8', text: 'Ваши посылки'},
    {color: '#FF8A8A', text: 'Хранение товара'},
    {color: '#495665', text: 'Бесплатная доставка'},
    {color: '#604C79', text: 'О нашей команде'},
    {color: '#7ABBA8', text: 'Ваши посылки'},
  ];

  const Right = () => {
    return (
      <View style={styles.iconContainer}>
        <BellIcon size={19} />
        <SingleUser size={19} />
      </View>
    );
  };

  return (
    <SafeAreaView>
      <Header text="Отследить заказ" Right={Right} />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{padding: 20, paddingRight: 40}}>
        <View style={styles.headerWrapper}>
          {Components.map((item, index) => (
            <GradientWrapper key={index} text={item.text} color={item.color} />
          ))}
        </View>
      </ScrollView>
      <ScrollView>
        <View style={styles.Wrapper}></View>
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
  iconContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
});
