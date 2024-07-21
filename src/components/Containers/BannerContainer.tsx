import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

// Создайте объект для хранения путей к изображениям
export const imageSources = [
  require('../../assets/images/Reklama0.png'),
  require('../../assets/images/Reklama1.png'),
];
export const BannerWrapper = ({index}: {index: number}) => {
  const imageSource = imageSources[index];
  return (
    <View style={[styles.wrapper]}>
      <Image source={imageSource} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 10,
  },
  image: {
    width: 280,
    height: 120,
    maxHeight: 120,
    maxWidth: 280,
    borderRadius: 10,
  },
});
