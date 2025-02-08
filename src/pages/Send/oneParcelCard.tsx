import {StyleSheet, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Check from '../../assets/icons/Check';
import Not from '../../assets/icons/Not';

export const OneParcelCard = ({oneParcel = []}: any) => {
  const navigation: any = useNavigation();

  return (
    <View style={styles.wrapper}>
      {oneParcel.map((item: any) => (
        <View style={{display: 'flex', flexDirection: 'row', gap: 10}}>
          {item.payment ? (
            <Check />
          ): (
            <Not />
          )}
          <View
            style={{display: 'flex', flexDirection: 'column', gap: 5}}>
                <Text style={styles.mainText}>
                    {item.date}
                </Text>
                <Text style={styles.mainText}>
                    {item.status}
                </Text>
                <Text style={styles.mainText}>
                    {item.sum}
                </Text>
            </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 15,
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
    borderRadius: 10,
    width: '100%',
    backgroundColor: 'white',
    position: 'relative',
  },
  mainText: {
    fontSize: 16,
    fontWeight: 700,
  },
  secondText: {
    fontSize: 14,
    color: 'white',
  },
});
