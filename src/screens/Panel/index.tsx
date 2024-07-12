import {View, StyleSheet, Text, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CarSvg from '../../assets/svg/CarSvg';

export const Panel = () => {
  return (
    <LinearGradient
      colors={['#5BA0D1', '#9CC042']}
      style={styles.container}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}>
      <View style={styles.textWrapper}>
        <Text style={[styles.text, {fontSize: 15, fontWeight: '600'}]}>
          Рассчитать стоимость
        </Text>
        <Text style={[styles.text, {fontSize: 13, fontWeight: '400'}]}>
          Узнайте стоимость отправки своей полсылки
        </Text>
      </View>
      <Image source={require('../../assets/images/CarSvg.png')} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 10,
    paddingHorizontal: 20,
    backgroundColor: '',
  },
  textWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    width: '60%',
    paddingVertical: 20
  },
  text: {
    color: '#F9FFFF',
  },
});
