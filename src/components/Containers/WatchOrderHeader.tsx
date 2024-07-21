import React, {ReactNode} from 'react';
import {View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export const GradientWrapper = ({
  text,
  color,
}: {
  color: string;
  text: string;
}) => {
  return (
    <LinearGradient
      colors={['#5BA0D1', '#9CC042']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={{
        flex: 1,
        borderRadius: 20,
        padding: 2,
      }}>
      <View style={{backgroundColor: 'white', padding: 2, borderRadius: 18}}>
        <View style={[styles.wrapper, {backgroundColor: color}]}></View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: 75,
    height: 75,
    borderRadius: 20,
    position: 'relative'
  },
});
