import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

export const imageSources = [require('../../assets/images/BANNER.png')];
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
    height: 150,
    maxHeight: 150,
    maxWidth: 280,
    borderRadius: 10,
  },
});
