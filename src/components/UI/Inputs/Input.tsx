import {View, StyleSheet, TextInput} from 'react-native';

interface InputProps {
  value: string;
  onChange: any;
  placeholder: string;
  style?: object;
  disbaled?: boolean
  keyboardType?: boolean
}

export const Input = ({value, onChange, placeholder, style, disbaled = false, keyboardType = false}: InputProps) => {
  const inputAccessoryViewID = 'uniqueID';
  return (
    <View style={{position: 'relative', width: '100%'}}>
      <TextInput
        style={[styles.input, style]}
        inputAccessoryViewID={inputAccessoryViewID}
        onChangeText={!disbaled ? onChange: false}
        value={value}
        placeholder={placeholder}
        keyboardType={keyboardType? 'numeric' :'default'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 10,
    paddingTop: 12,
    paddingBottom: 14,
    paddingHorizontal: 20,
    borderColor: '#8C8C8C',
    borderWidth: 1,
    color: '#8C8C8C',
    fontSize: 13,
    fontWeight: '400',
  },
});
