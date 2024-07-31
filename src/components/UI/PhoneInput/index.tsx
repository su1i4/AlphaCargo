import React from 'react';
import PhoneInput from "react-native-phone-number-input";
import { StyleSheet } from 'react-native';

export const PhoneNumberInput = ({setPhoneNumber}: any) => {

  return (
    <PhoneInput
      defaultCode="KZ"
      layout="first"
      onChangeFormattedText={(text) => {
        console.log(text);
      }}
      onChangeText={(text) => {
        // setPhoneNumber(text);
        console.log(text, 'this is number')
      }}
      containerStyle={styles.containerStyle}
      textContainerStyle={styles.textContainerStyle}
      textInputStyle={styles.textInputStyle}
      codeTextStyle={styles.codeTextStyle}
      flagButtonStyle={styles.flagButtonStyle}
      countryPickerButtonStyle={styles.countryPickerButtonStyle}
    />
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    overflow: 'hidden'
  },
  textContainerStyle: {
    borderLeftWidth: 1,
    borderLeftColor: '#ccc',
    backgroundColor: 'white',
  },
  textInputStyle: {
    height: 50,
    fontSize: 15,
  },
  codeTextStyle: {
    fontSize: 15,
    color: '#000018',
    height: 20,    
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
