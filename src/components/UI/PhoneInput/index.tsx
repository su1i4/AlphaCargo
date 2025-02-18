import React, {useRef, useImperativeHandle, forwardRef} from 'react';
import PhoneInput from 'react-native-phone-number-input';
import {StyleSheet, Text, View} from 'react-native';

export const PhoneNumberInput = forwardRef(
  ({setPhoneNumber, label}: any, ref) => {
    const phoneInput = useRef<PhoneInput>(null);

    useImperativeHandle(ref, () => ({
      reset: () => {
        if (phoneInput.current) {
          phoneInput.current.setState({number: ''});
          setPhoneNumber('');
        }
      },
    }));

    return (
      <View>
        {label && <Text style={{fontSize: 15, marginBottom: 5}}>{label}</Text>}
        <PhoneInput
          ref={phoneInput}
          defaultCode="KG"
          layout="first"
          onChangeFormattedText={text => {
            setPhoneNumber(text);
          }}
          placeholder="Номер телефона"
          containerStyle={styles.containerStyle}
          textContainerStyle={styles.textContainerStyle}
          textInputStyle={styles.textInputStyle}
          codeTextStyle={styles.codeTextStyle}
          flagButtonStyle={styles.flagButtonStyle}
          countryPickerButtonStyle={styles.countryPickerButtonStyle}
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  containerStyle: {
    width: '100%',
    height: 55,
    minHeight: 55,
    maxHeight: 55,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#8C8C8C',
    overflow: 'hidden',
  },
  textContainerStyle: {
    borderLeftWidth: 1,
    borderLeftColor: '#ccc',
    backgroundColor: 'white',
  },
  textInputStyle: {
    height: 55,
    minHeight: 55,
    maxHeight: 55,
    fontSize: 14,
    fontWeight: 500,
    color: '#808080',
  },
  codeTextStyle: {
    fontSize: 14,
    color: '#808080',
  },
  flagButtonStyle: {
    width: 60,
    height: 50,
    backgroundColor: '#FFFFFF',
  },
  countryPickerButtonStyle: {
    width: 60,
    height: 50,
    backgroundColor: '#FFFFFF',
  },
});
