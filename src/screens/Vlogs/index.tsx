import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Image,
  FlatList,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  StyleSheet,
  GestureResponderEvent,
  PanResponder,
  Platform,
  TouchableOpacity,
  Text,
  Linking,
} from 'react-native';
import CloseIcon from '../../assets/icons/CloseIcons';

const screenWidth = Dimensions.get('window').width;

export default function Vlogs({route}: any) {
  const {Components, id} = route.params;
  const [currentIndex, setCurrentIndex] = useState(0);
  const progress = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);
  const navigation: any = useNavigation();
  const [currentID, setCurrentID] = useState<number>(0);
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 20;
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < -50) {
          goToNextStory();
        } else if (gestureState.dx > 50) {
          goToPreviousStory();
        }
      },
    }),
  ).current;

  useEffect(() => {
    if (id) {
      setCurrentID(id);
    }
  }, [id]);

  useEffect(() => {
    startProgress();
  }, [currentIndex, currentID]);

  const startProgress = () => {
    progress.setValue(0);
    Animated.timing(progress, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: false,
    }).start(({finished}) => {
      if (finished) {
        goToNextStory();
      }
    });
  };

  const goToNextStory = () => {
    if (currentIndex < Components[currentID].children.length - 1) {
      setCurrentIndex(currentIndex + 1);
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      if (currentID < Components.length - 1) {
        setCurrentID(prev => prev + 1);
        setCurrentIndex(0);
        flatListRef.current?.scrollToIndex({index: 0, animated: true});
      } else {
        navigation.goBack();
      }
    }
  };

  const goToPreviousStory = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      flatListRef.current?.scrollToIndex({
        index: currentIndex - 1,
        animated: true,
      });
    } else {
      if (currentID > 0) {
        setCurrentID(prev => prev - 1);
      }
    }
  };

  const handlePress = (event: GestureResponderEvent) => {
    const touchX = event.nativeEvent.locationX;
    if (touchX < screenWidth / 2) {
      goToPreviousStory();
    } else {
      goToNextStory();
    }
  };

  const phoneNumber = Components[currentID].phoneNumber

  const whatsAppUrl = `whatsapp://send?phone=${phoneNumber}`;
  const webWhatsAppUrl = `https://wa.me/${phoneNumber}`;

  const openWhatsAppOrWebsite = async () => {
    try {
      const supported = await Linking.canOpenURL(whatsAppUrl);
      if (supported) {
        await Linking.openURL(whatsAppUrl);
      } else {
        await Linking.openURL(webWhatsAppUrl);
      }
    } catch (error) {
      await Linking.openURL(webWhatsAppUrl);
    }
  };

  const renderProgressBars = () => {
    return (
      <View style={styles.progressContainer}>
        {Components[currentID].children.map((_: any, index: number) => (
          <View
            key={index}
            style={[
              styles.progressBar,
              {
                backgroundColor:
                  index < currentIndex
                    ? '#fff'
                    : index === currentIndex
                    ? 'rgba(255, 255, 255, 0.5)'
                    : 'rgba(255, 255, 255, 0.3)',
              },
            ]}>
            {index === currentIndex && (
              <Animated.View
                style={[
                  styles.progressFill,
                  {
                    width: progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0%', '100%'],
                    }),
                  },
                ]}
              />
            )}
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={handlePress}>
        <View style={styles.content} {...panResponder.panHandlers}>
          <FlatList
            ref={flatListRef}
            horizontal
            data={Components[currentID].children}
            renderItem={({item}) => (
              <Image source={item} style={styles.image} />
            )}
            keyExtractor={(_, index) => index.toString()}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
          />
          {renderProgressBars()}

          {/* WhatsApp Button */}
          <TouchableOpacity
            style={[styles.whatsappButton, Components[currentID].buttonStyle]}
            onPress={openWhatsAppOrWebsite}
            activeOpacity={0.8}>
            <Text style={[styles.whatsappButtonText, Components[currentID].buttonTextStyle]}>{Components[currentID].buttonText}</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.icon}>
        <CloseIcon color="white" size={30} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 75 : 45,
    right: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#00000050',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  progressContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 30,
    left: 10,
    right: 10,
  },
  progressBar: {
    flex: 1,
    height: 3,
    marginHorizontal: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#fff',
  },
  image: {
    width: screenWidth,
    height: '100%',
  },
  whatsappButton: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 50 : 30,
    alignSelf: 'center',
    backgroundColor: '#25D366',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  whatsappButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
