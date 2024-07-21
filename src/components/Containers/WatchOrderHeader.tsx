import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
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
        <View style={[styles.wrapper, {backgroundColor: color}]}>
          <Text style={styles.text}>
            {text}
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: 75,
    height: 75,
    borderRadius: 20,
    position: 'relative',
  },
  text: {
    position: 'absolute',
    left: 10,
    right: 10,
    bottom: 10,
    color: 'white',
    fontSize: 9,
    textAlign: 'center',
    fontWeight: '700'
  }
});
