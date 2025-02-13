import {useEffect, useState, useRef} from 'react';
import {
  Dimensions,
  Animated,
  View,
  PanResponder,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';

const {height} = Dimensions.get('window');
const BOTTOM_SHEET_HEIGHT = height * 0.6;
const MIN_HEIGHT = 150;

export const BottomSheet = () => {
  const translateY = useRef(
    new Animated.Value(BOTTOM_SHEET_HEIGHT - MIN_HEIGHT),
  ).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy < MIN_HEIGHT) {
          openSheet()
        }
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > (BOTTOM_SHEET_HEIGHT - MIN_HEIGHT) / 2) {
          closeSheet();
        } else {
          openSheet();
        }
      },
    }),
  ).current;

  const openSheet = () => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeSheet = () => {
    Animated.timing(translateY, {
      toValue: BOTTOM_SHEET_HEIGHT - MIN_HEIGHT,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {});
  };

  return (
    <Animated.View
      style={[styles.sheet, {transform: [{translateY}]}]}
      {...panResponder.panHandlers}>
      <View style={styles.handle} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: BOTTOM_SHEET_HEIGHT,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  handle: {
    width: 50,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 2.5,
    alignSelf: 'center',
    marginBottom: 10,
  },
});

export default BottomSheet;
