import React, { useState } from 'react';
import {StyleSheet, View, Platform} from 'react-native';
import SectionItem from './SectionItem';
import UserIcon from '../../assets/icons/UsersIcon';
import MapIcon from '../../assets/icons/MapIcon';
import {useNavigation} from '@react-navigation/native';
import CustomModal from '../UI/Modal';

const AuthFooter = () => {
  const navigation: any = useNavigation();
  const [active, setActive] = useState(false)
  return (
    <View style={styles.footerContainer}>
      <CustomModal active={active} onClose={() => setActive(false)} />
      <SectionItem
        title="Стать клиентом"
        Icon={UserIcon}
        onPress={() => navigation.navigate('SignUp')}
        style={{
          borderTopLeftRadius: 4,
          borderTopRightRadius: 4,
        }}
      />
      <SectionItem
        title="Карта офисов"
        Icon={MapIcon}
        onPress={() => setActive(true)}
        style={{
          borderBottomLeftRadius: 4,
          borderBottomRightRadius: 4,
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
