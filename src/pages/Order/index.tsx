import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { GestureDetector, GestureHandlerRootView, Gesture } from 'react-native-gesture-handler';
import Header from '../../screens/Header';
import SingleUser from '../../assets/icons/SingleUser';
import LocateIcon from '../../assets/icons/LocateIcon';
import BurgerIcon from '../../assets/icons/BurgerIcon';

const BottomSheet = ({ isVisible, onClose }: any) => {
  const translateY = useSharedValue(300);

  const gesture = Gesture.Pan()
    .onUpdate((e) => {
      translateY.value = Math.max(0, translateY.value + e.translationY);
    })
    .onEnd(() => {
      if (translateY.value > 150) {
        translateY.value = withSpring(300);
        onClose();
      } else {
        translateY.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  React.useEffect(() => {
    if (isVisible) {
      translateY.value = withSpring(0);
    } else {
      translateY.value = withSpring(300);
    }
  }, [isVisible]);

  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.bottomSheet, animatedStyle]}>
          <Text style={styles.sheetContent}>This is a bottom sheet</Text>
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default function Order() {
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header isSearch placeholder="Введите адрес" id="Orders" text="Пункты Альфа" Right={SingleUser} />
      <View style={styles.header}>
        <Text style={styles.tab}>Рядом</Text>
        <Text style={styles.tab}>Открыто</Text>
      </View>
      <View style={styles.container}>
        <Text style={{ fontSize: 20 }}>
          Здесь будет карта
        </Text>
        <View style={[styles.popAp, { bottom: 80 }]}>
          <LocateIcon />
        </View>
        <TouchableOpacity style={[styles.popAp, { bottom: 20 }]} onPress={() => setBottomSheetVisible(true)}>
          <BurgerIcon size={28} active={true} lox={true} />
        </TouchableOpacity>
      </View>
      <BottomSheet isVisible={isBottomSheetVisible} onClose={() => setBottomSheetVisible(false)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    position: 'relative'
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
    justifyContent: 'center'
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 300,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  sheetContent: {
    padding: 20,
    fontSize: 16,
  },
});
