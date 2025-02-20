import {View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import LupaIcon from '../../../assets/icons/LupaIcon';
import QrCode from '../../../assets/icons/QrCode';

interface InputProps {
  value: string;
  onChange: any;
  placeholder: string;
  id: string;
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
        placeholderTextColor="#2B3F6C"
      />
      <TouchableOpacity>
        <QrCode />
      </TouchableOpacity>
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
    paddingRight: 10,
    justifyContent: 'space-between',
    fontSize: 13,
    fontWeight: '400',
    backgroundColor: '#F0F1F3',
    height: 50,
    minHeight: 50,
    maxHeight: 50,
  },
  input: {
    color: '#505893',
    fontSize: 14,
    fontWeight: '400',
    width: '80%',
    height: 50,
    minHeight: 50,
    maxHeight: 50,
    fontFamily: 'Exo 2'
  },
});
