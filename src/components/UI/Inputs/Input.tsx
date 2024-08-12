import {View, StyleSheet, TextInput} from 'react-native';

interface InputProps {
  value: string;
  onChange: any;
  placeholder: string;
  style?: object;
}

export const Input = ({value, onChange, placeholder, style}: InputProps) => {
  const inputAccessoryViewID = 'uniqueID';
  return (
    <View style={{position: 'relative'}}>
      <TextInput
        style={[styles.input, style]}
        inputAccessoryViewID={inputAccessoryViewID}
        onChangeText={onChange}
        value={value}
        placeholder={placeholder}
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
