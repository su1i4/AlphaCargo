import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import SectionItem from './SectionItem';
import UserIcon from '../../assets/icons/UsersIcon';
import MapIcon from '../../assets/icons/MapIcon';

const AuthFooter = () => {
  return (
    <View style={styles.footerContainer}>
      <SectionItem
        title="Стать клиентом"
        Icon={UserIcon}
        onPress={() => console.log('heelo')}
        style={{
          borderTopLeftRadius: 4,
          borderTopRightRadius: 4,
        }}
      />
      <SectionItem
        title="Карта офисов"
        Icon={MapIcon}
        onPress={() => console.log('heelo')}
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
