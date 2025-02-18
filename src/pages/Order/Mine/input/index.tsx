import {View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import LupaIcon from '../../../../assets/icons/LupaIcon';

interface InputProps {
  value: string;
  onChange: any;
  placeholder: string;
  id: string;
}

export const GeoSearchInput = ({
  value,
  onChange,
  placeholder,
  id,
}: InputProps) => {
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
    gap: 10,
    fontSize: 13,
    fontWeight: '400',
    backgroundColor: '#F0F1F3',
    height: 35,
    minHeight: 35,
    maxHeight: 35,
  },
  input: {
    color: '#505893',
    fontSize: 14,
    fontWeight: '400',
    width: '80%',
    height: 35,
    minHeight: 35,
    maxHeight: 35,
  },
});
