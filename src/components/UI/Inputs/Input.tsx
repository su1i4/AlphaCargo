import { View, StyleSheet, TextInput, Text } from 'react-native';

interface InputProps {
  value: string;
  onChange: (text: string) => void;
  placeholder: string;
  style?: object;
  disabled?: boolean;
  number?: boolean;
  placeholderTextColor?: string;
  label?: string;
}

export const Input = ({
  value,
  onChange,
  placeholder,
  style,
  disabled = false,
  number = false,
  placeholderTextColor = '#A9A9A9',
  label,
}: InputProps) => {
  const handleChangeText = (text: string) => {
    if (disabled) return;

    if (number) {
      const filteredText = text.replace(/[^0-9]/g, ''); // Оставляем только цифры
      onChange(filteredText);
    } else {
      onChange(text);
    }
  };

  return (
    <View style={{ position: 'relative', width: '100%' }}>
      {label && <Text style={{ fontSize: 15, marginBottom: 5 }}>{label}</Text>}

      <TextInput
        style={[styles.input, style]}
        onChangeText={handleChangeText}
        value={value}
        placeholder={placeholder}
        keyboardType={number ? 'numeric' : 'default'}
        placeholderTextColor={placeholderTextColor}
        editable={!disabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 16,
    height: 55,
    maxHeight: 55,
    minHeight: 55,
    paddingHorizontal: 20,
    borderColor: '#8C8C8C',
    borderWidth: 1,
    color: 'black',
    fontSize: 15,
    fontWeight: '400',
  },
});