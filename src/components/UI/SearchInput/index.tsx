import {View, StyleSheet, TextInput} from 'react-native';
import LupaIcon from '../../../assets/icons/LupaIcon';

interface InputProps {
  value: string;
  onChange: any;
  placeholder: string;
  id: string
}

export const SearchInput = ({value, onChange, placeholder, id}: InputProps) => {
  const inputAccessoryViewID = id;
  return (
    <View style={styles.wrap}>
      <LupaIcon size={22} color={true} active={false} />
      <TextInput
        style={styles.input}
        inputAccessoryViewID={inputAccessoryViewID}
        onChangeText={onChange}
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#505893"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 13,
    fontWeight: '400',
    backgroundColor: '#1E2661',
    gap: 5,
    height: 50,
    minHeight: 50,
    maxHeight: 50,
  },
  input: {
    color: '#505893',
    fontSize: 14,
    fontWeight: '400',
    width: '90%',
    height: 50,
    minHeight: 50,
    maxHeight: 50,
  },
});
