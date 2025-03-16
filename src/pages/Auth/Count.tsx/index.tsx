import {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

export const Count = ({onPress}: {onPress: () => void}) => {
  const [count, setCount] = useState(90);
  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => {
        setCount(count - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [count]);
  
  return (
    <TouchableOpacity
      onPress={() => {
        if (count > 0) {
          return;
        }
        onPress();
        setCount(60);
      }}
      style={{
        width: '100%',
        borderRadius: 10,
        justifyContent: 'center',
      }}>
      <Text
        style={{
          width: '100%',
          fontSize: 16,
          color: '#636363',
          fontFamily: 'Exo 2',
        }}>
        {count > 0 ? `Отправить повторно через ${count}` : 'Отправить повторно'}
      </Text>
    </TouchableOpacity>
  );
};
