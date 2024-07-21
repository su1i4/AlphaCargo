import {SafeAreaView} from 'react-native';
import Header from '../Header';
import BellIcon from '../../assets/icons/BellIcon';
import LogoutIcon from '../../assets/icons/LogoutIcon';

export default function Profile() {
  return (
    <SafeAreaView>
      <Header Left={BellIcon} text="Личный кабинет" Right={LogoutIcon} />
    </SafeAreaView>
  );
}
