import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import SectionItem from './SectionItem';
import UserIcon from '../../assets/icons/UsersIcon';
import MapIcon from '../../assets/icons/MapIcon';
import { useNavigation } from '@react-navigation/native';

const AuthFooter = () => {
  const navigation: any = useNavigation()
  return (
    <View style={styles.footerContainer}>
      <SectionItem
        title="Стать клиентом"
        Icon={UserIcon}
        onPress={() => navigation.navigate('SignUpMain')}
        style={{
          borderTopLeftRadius: 4,
          borderTopRightRadius: 4,
        }}
      />
      <SectionItem
        title="Карта офисов"
        Icon={MapIcon}
        onPress={() => navigation.navigate('Offices')}
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
    bottom: 30,
    paddingHorizontal: '5%',
    display: 'flex',
    flexDirection: 'column',
  },
});

export default AuthFooter;
