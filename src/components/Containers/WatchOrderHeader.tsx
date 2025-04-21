import {useNavigation} from '@react-navigation/native';
import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export const GradientWrapper = ({item, Components}: any) => {
  const naviagation: any = useNavigation();
  return (
    <LinearGradient
      colors={['#5BA0D1', '#9CC042']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={{
        flex: 1,
        borderRadius: 45,
        padding: 3,
      }}>
      <TouchableOpacity
        onPress={() => naviagation.navigate('Vlogs', {Components: Components, id: item.id})}
        style={{
          backgroundColor: '#026297',
          padding: 3,
          borderRadius: 42,
          position: 'relative',
          overflow: 'hidden',
        }}>
        {/* <Image
          source={item.image}
          style={[styles.wrapper, {backgroundColor: item.color}]}
        /> */}
        {item.image}
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    objectFit: 'cover',
  },
  text: {
    position: 'absolute',
    left: 10,
    right: 10,
    bottom: 10,
    color: 'white',
    fontSize: 9,
    textAlign: 'center',
    fontWeight: '700',
  },
});
