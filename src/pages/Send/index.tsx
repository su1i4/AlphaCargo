import {SafeAreaView, View} from 'react-native';
import Header from '../../screens/Header';
import SingleUser from '../../assets/icons/SingleUser';

export default function Send() {
  return (
    <SafeAreaView>
      <Header text="Отправления" Right={SingleUser} />
      <View>
      </View>
    </SafeAreaView>
  );
}
