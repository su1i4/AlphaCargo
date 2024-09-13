import React, {useEffect, useRef, useState} from 'react';
import {View, Image, FlatList, Animated, Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default function Vlogs({route}: any) {
  const {item} = route.params;
  const [currentIndex, setCurrentIndex] = useState(0);
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startProgress();
  }, [currentIndex]);

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
    if (currentIndex < item.children.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const renderProgressBars = () => {
    return (
      <View style={{flexDirection: 'row', marginTop: 10}}>
        {item.children.map((_: any, index: any) => (
          <View
            key={index}
            style={{
              flex: 1,
              height: 3,
              backgroundColor:
                index <= currentIndex ? '#fff' : 'rgba(255, 255, 255, 0.3)',
              marginHorizontal: 2,
              overflow: 'hidden',
            }}>
            {index === currentIndex && (
              <Animated.View
                style={{
                  height: '100%',
                  backgroundColor: '#fff',
                  width: progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '100%'],
                  }),
                }}
              />
            )}
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      {renderProgressBars()}
      <FlatList
        horizontal
        data={item.children}
        renderItem={({item}) => (
          <Image source={item} style={{width: screenWidth, height: '100%'}} />
        )}
        keyExtractor={(image, index) => index.toString()}
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
