import {View, StyleSheet, Text} from 'react-native';

export const Sign = () => {
  return (
    <View style={styles.Shhe}>
      <Text style={styles.text}>Запросить временный пароль</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  Shhe: {
    backgroundColor: '#C1C1C1',
    borderRadius: 10,
    padding: 10,
    width: 'auto'
  },
  text: {
    color: '#000018',
    fontSize: 13,
    fontWeight: '400',
  },
});
