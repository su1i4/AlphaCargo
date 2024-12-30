import {StyleSheet, View, Platform} from 'react-native';
import SectionItem from './SectionItem';
import UserIcon from '../../assets/icons/UsersIcon';
import MapIcon from '../../assets/icons/MapIcon';
import {useNavigation} from '@react-navigation/native';

const AuthFooter = () => {
  const navigation: any = useNavigation();
  return (
    <View style={styles.footerContainer}>
      <SectionItem
        title="Стать клиентом"
        Icon={<UserIcon size={22} />}
        onPress={() => navigation.navigate('SignUp')}
        style={{
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
      />
      <SectionItem
        title="Карта офисов"
        Icon={<MapIcon size={22} />}
        onPress={() => navigation.navigate('OfficesLog')}
        style={{
          borderBottomLeftRadius: 12,
          borderBottomRightRadius: 12,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    width: '100%',
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 50 : 30,
    paddingHorizontal: '5%',
    display: 'flex',
    flexDirection: 'column',
  },
});

export default AuthFooter;
