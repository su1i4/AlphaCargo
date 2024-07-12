import {SafeAreaView, StyleSheet, View} from 'react-native';
import Header from '../../screens/Header';
import BellIcon from '../../assets/icons/BellIcon';
import SingleUser from '../../assets/icons/SingleUser';

export default function WatchOrder() {
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
