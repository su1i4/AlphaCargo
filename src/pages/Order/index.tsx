import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
  PanResponder,
  ScrollView,
  Dimensions,
} from 'react-native';
import Header from '../../screens/Header';
import {Puncts} from '../../screens/Puncts';
import SingleUser from '../../assets/icons/SingleUser';
import LocateIcon from '../../assets/icons/LocateIcon';
import BurgerIcon from '../../assets/icons/BurgerIcon';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const BOTTOM_SHEET_MAX_HEIGHT = SCREEN_HEIGHT * 0.7;
const BOTTOM_SHEET_MIN_HEIGHT = 0;
const MAX_UPWARD_TRANSLATE_Y = -BOTTOM_SHEET_MAX_HEIGHT;
const MIN_DOWNWARD_TRANSLATE_Y = 0;

export default function Order() {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const lastGestureDy = useRef(0);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        animatedValue.setOffset(lastGestureDy.current);
      },
      onPanResponderMove: (e, gesture) => {
        animatedValue.setValue(gesture.dy);
      },
      onPanResponderRelease: (e, gesture) => {
        animatedValue.flattenOffset();
        const {dy} = gesture;

        if (dy > 0) {
          // Swipe down
          if (dy > BOTTOM_SHEET_MAX_HEIGHT / 2) {
            springAnimation(MIN_DOWNWARD_TRANSLATE_Y);
          } else {
            springAnimation(MAX_UPWARD_TRANSLATE_Y);
          }
        } else {
          // Swipe up
          if (dy < -BOTTOM_SHEET_MAX_HEIGHT / 2) {
            springAnimation(MAX_UPWARD_TRANSLATE_Y);
          } else {
            springAnimation(MIN_DOWNWARD_TRANSLATE_Y);
          }
        }
      },
    }),
  ).current;

  const springAnimation = (toValue: any) => {
    lastGestureDy.current = toValue;
    Animated.spring(animatedValue, {
      toValue,
      useNativeDriver: true,
    }).start(() => {
      setBottomSheetVisible(toValue !== 0);
    });
  };

  const bottomSheetAnimation = {
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [MAX_UPWARD_TRANSLATE_Y, MIN_DOWNWARD_TRANSLATE_Y],
          outputRange: [MAX_UPWARD_TRANSLATE_Y, MIN_DOWNWARD_TRANSLATE_Y],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  const showBottomSheet = () => {
    setBottomSheetVisible(true);
    Animated.spring(animatedValue, {
      toValue: MAX_UPWARD_TRANSLATE_Y,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header
        isSearch
        placeholder="Введите адрес"
        id="Orders"
        text="Пункты Альфа"
        Right={SingleUser}
      />
      <View style={styles.header}>
        <Text style={styles.tab}>Рядом</Text>
        <Text style={styles.tab}>Открыто</Text>
      </View>
      <View style={styles.container}>
        <Text style={{fontSize: 20}}>Здесь будет карта</Text>
        <View style={[styles.popAp, {bottom: 80}]}>
          <LocateIcon />
        </View>
        <TouchableOpacity
          style={[styles.popAp, {bottom: 20}]}
          onPress={showBottomSheet}>
          <BurgerIcon size={28} active={true} lox={true} />
        </TouchableOpacity>
      </View>
      {bottomSheetVisible && (
        <Animated.View
          style={[styles.bottomSheet, bottomSheetAnimation]}
          {...panResponder.panHandlers}>
          <View style={styles.bottomSheetHeader}>
            <View style={styles.bottomSheetHeaderBar} />
          </View>
          <ScrollView>
            <View style={styles.bottomSheetContent}>
              {/* <Puncts /> */}
            </View>
          </ScrollView>
        </Animated.View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    position: 'relative',
  },
  header: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  tab: {
    color: '#000000',
    fontSize: 13,
    fontWeight: '400',
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 20,
  },
  popAp: {
    position: 'absolute',
    right: 20,
    backgroundColor: '#94C325',
    width: 50,
    height: 50,
    borderRadius: 50,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -BOTTOM_SHEET_MAX_HEIGHT,
    height: BOTTOM_SHEET_MAX_HEIGHT,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -3},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  bottomSheetHeader: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  bottomSheetHeaderBar: {
    width: 60,
    height: 5,
    backgroundColor: '#bbb',
    borderRadius: 3,
  },
  bottomSheetContent: {
    padding: 20,
    fontSize: 16,
  },
});
