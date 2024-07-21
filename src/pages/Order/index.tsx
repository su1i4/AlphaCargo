import {SafeAreaView} from 'react-native';
import Header from '../../screens/Header';
import SingleUser from '../../assets/icons/SingleUser';

export default function Order() {
  return (
    <SafeAreaView>
      <Header text="Пункты Альфа" Right={SingleUser} />
    </SafeAreaView>
  );
}
