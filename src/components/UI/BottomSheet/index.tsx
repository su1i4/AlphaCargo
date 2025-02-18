import {useRef} from 'react';
import {
  Dimensions,
  Animated,
  View,
  PanResponder,
  StyleSheet,
  ScrollView,
} from 'react-native';

const {height} = Dimensions.get('window');
const BOTTOM_SHEET_HEIGHT = height * 0.6;
const MIN_HEIGHT = 150;

interface BottomSheetProps {
  children?: React.ReactNode;
}

export const BottomSheet = ({children}: BottomSheetProps) => {
  const translateY = useRef(
    new Animated.Value(BOTTOM_SHEET_HEIGHT - MIN_HEIGHT),
  ).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const newY = Math.max(
          0,
          Math.min(BOTTOM_SHEET_HEIGHT - MIN_HEIGHT, gestureState.dy),
        );
        translateY.setValue(newY);
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
    }).start();
  };

  return (
    <Animated.View style={[styles.sheet, {transform: [{translateY}]}]}>
      <View style={styles.handleWrap} {...panResponder.panHandlers}>
        <View style={styles.handle} />
      </View>
      <View style={styles.innerSheet}>{children}</View>
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
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    paddingHorizontal: 15,
  },
  handle: {
    width: 50,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 2.5,
    alignSelf: 'center',
  },
  handleWrap: {
    width: '100%',
    paddingVertical: 10,
  },
  innerSheet: {
    flex: 1,
  },
});

export default BottomSheet;
