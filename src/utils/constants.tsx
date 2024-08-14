import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const toastConfig = {
  success: (props: any) => (
    <View style={styles.successToast}>
      <Text style={styles.text1}>{props.text1}</Text>
      {props.text2 && <Text style={styles.text2}>{props.text2}</Text>}
    </View>
  ),
  error: (props: any) => (
    <View style={styles.errorToast}>
      <Text style={styles.text1}>{props.text1}</Text>
      {props.text2 && <Text style={styles.text2}>{props.text2}</Text>}
    </View>
  ),
};

const styles = StyleSheet.create({
  successToast: {
    minWidth: 300,
    borderLeftWidth: 5,
    borderLeftColor: 'green',
    backgroundColor: '#fff',
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  errorToast: {
    minWidth: 300,
    borderLeftWidth: 5,
    borderLeftColor: 'red',
    backgroundColor: '#fff',
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  text1: {
    fontSize: 15,
    fontWeight: '400',
    color: 'black',
  },
  text2: {
    fontSize: 13,
    color: 'black',
  },
});
