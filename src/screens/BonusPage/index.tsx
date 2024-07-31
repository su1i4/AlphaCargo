import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import Header from '../Header';
import {useNavigation} from '@react-navigation/native';
import LogoutIcon from '../../assets/icons/LogoutIcon';
import BellIcon from '../../assets/icons/BellIcon';

export default function Bonus() {
  const naviagation: any = useNavigation();
  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        id=""
        text="Бонусы"
        Left={BellIcon}
        Right={LogoutIcon}
        func={() => naviagation.goBack()}
        funcLeft={() => naviagation.navigate('Notifications')}
      />
      <ScrollView style={styles.scrollView}>
        <View style={styles.Wrapper}>
            
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