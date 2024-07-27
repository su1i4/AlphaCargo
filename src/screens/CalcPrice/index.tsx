import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import Header from '../Header';
import SingleUser from '../../assets/icons/SingleUser';
import {useNavigation} from '@react-navigation/native';

export default function CalcPrice() {
  const naviagation: any = useNavigation();
  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        id="Profile"
        text="Рассчитать стоимость"
        Right={SingleUser}
        func={() => naviagation.navigate('Profile')}
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
