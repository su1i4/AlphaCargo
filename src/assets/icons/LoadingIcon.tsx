import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const LoadingIcon = ({ size = 24, color = '#FFFFFF' }) => {
  const rotateValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 700,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [rotateValue]);

  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={{ transform: [{ rotate }] }}>
      <Svg height={size} width={size} viewBox="0 0 50 50">
        <Circle
          cx="25"
          cy="25"
          r="20"
          stroke={color}
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="126"
          strokeDashoffset="31.5" // Adjusted for 75% closed circle
        />
      </Svg>
    </Animated.View>
  );
};

export default LoadingIcon;

