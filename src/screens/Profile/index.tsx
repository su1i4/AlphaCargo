import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';
import Header from '../Header';
import BellIcon from '../../assets/icons/BellIcon';
import LogoutIcon from '../../assets/icons/LogoutIcon';
import {useNavigation} from '@react-navigation/native';
import {Panel} from '../Panel';

export default function Profile() {
  const naviagation: any = useNavigation();
  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        id="Profile"
        Left={BellIcon}
        text="Личный кабинет"
        Right={LogoutIcon}
        func={() => naviagation.goBack()}
      />
      <ScrollView style={styles.scrollView}>
        <View style={styles.Wrapper}>
          <TouchableOpacity onPress={() => naviagation.navigate('CalcPrice')}>
            <Panel />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  Wrapper: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    alignItems: 'center',
  },
});
