import React, { useRef, useState, useEffect } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const CodeInput = () => {
  const [code, setCode] = useState<any>(['', '', '', '']);
  const inputRefs = useRef<any>([]);
  const [focusedIndex, setFocusedIndex] = useState(0);

  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);

  const handleCodeChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text.length === 1 && index < 3) {
      setFocusedIndex(index + 1);
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (event: any, index: number) => {
    if (event.nativeEvent.key === 'Backspace' && code[index] === '') {
      if (index > 0) {
        setFocusedIndex(index - 1);
        inputRefs.current[index - 1].focus();
        const newCode = [...code];
        newCode[index - 1] = '';
        setCode(newCode);
      }
    }
  };

  const handleFocus = (index: number) => {
    const lastFilledIndex = code.findLastIndex((digit: any) => digit !== '');
    const newFocusIndex = lastFilledIndex === -1 ? 0 : Math.min(lastFilledIndex + 1, 3);
    
    if (index !== newFocusIndex) {
      inputRefs.current[newFocusIndex].focus();
    }
    setFocusedIndex(newFocusIndex);
  };

  return (
    <View style={styles.container}>
      {code.map((digit: any, index: any) => (
        <TextInput
          key={index}
          ref={(ref) => (inputRefs.current[index] = ref)}
          style={styles.input}
          value={digit}
          onChangeText={(text) => handleCodeChange(text, index)}
          onKeyPress={(event) => handleKeyPress(event, index)}
          onFocus={() => handleFocus(index)}
          maxLength={1}
          keyboardType="numeric"
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  input: {
    width: 55,
    height: 55,
    borderWidth: 2,
    color: '#000018',
    borderColor: '#94C325',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 18,
  },
});

export default CodeInput;