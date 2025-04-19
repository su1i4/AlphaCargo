import React from 'react';
import {Pressable, StyleSheet, View, Animated} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type GradientSwitchProps = {
  value: boolean;
  onValueChange: (val: boolean) => void;
  colors?: string[];
  size?: 'small' | 'medium';
};

export const GradientSwitch = ({
  value,
  onValueChange,
  colors = ['#203B7A', '#026297', '#006599'],
  size = 'small',
}: GradientSwitchProps) => {
  const width = size === 'small' ? 40 : 50;
  const height = size === 'small' ? 20 : 26;
  const thumbSize = size === 'small' ? 16 : 22;

  return (
    <Pressable
      onPress={() => onValueChange(!value)}
      style={[
        styles.switchContainer,
        {width, height, borderRadius: height / 2},
      ]}>
      {value ? (
        <LinearGradient
          colors={colors}
          style={[styles.track, {width, height, borderRadius: height / 2}]}
        />
      ) : (
        <View
          style={[
            styles.track,
            {width, height, borderRadius: height / 2, backgroundColor: '#ccc'},
          ]}
        />
      )}
      <Animated.View
        style={[
          styles.thumb,
          {
            left: value ? width - thumbSize - 2 : 2,
            width: thumbSize,
            height: thumbSize,
            borderRadius: thumbSize / 2,
            top: (height - thumbSize) / 2,
          },
        ]}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    position: 'relative',
    justifyContent: 'center',
  },
  track: {
    position: 'absolute',
  },
  thumb: {
    backgroundColor: '#fff',
    position: 'absolute',
    elevation: 2,
  },
});
