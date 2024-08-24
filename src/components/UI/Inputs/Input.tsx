import {View, StyleSheet, TextInput} from 'react-native';

interface InputProps {
  value: string;
  onChange: any;
  placeholder: string;
  style?: object;
  disbaled?: boolean
  keyboardType?: boolean
  placeholderTextColor?: string;
}

export const Input = ({value, onChange, placeholder, style, disbaled = false, keyboardType = false, placeholderTextColor = '#A9A9A9', }: InputProps) => {
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
        placeholderTextColor={placeholderTextColor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 10,
    height: 55,
    maxHeight: 55,
    minHeight: 55,
    paddingHorizontal: 20,
    borderColor: '#8C8C8C',
    borderWidth: 1,
    color: '#8C8C8C',
    fontSize: 13,
    fontWeight: '400',
  },
});
