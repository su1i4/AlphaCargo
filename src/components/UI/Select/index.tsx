import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import DropDown from '../../../assets/icons/DropDown';

interface SelectProps {
  value: number | string;
  onChange: (value: string | number) => void;
  placeholder: string;
  options: Array<{
    label: string | number;
    value: string | number;
    index?: number;
  }>;
  style?: object;
  disabled?: boolean;
}

export const Select = ({
  value,
  onChange,
  placeholder,
  options,
  style,
  disabled = false,
}: SelectProps) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleSelect = (selectedValue: string | number) => {
    if (!disabled) {
      onChange(selectedValue);
      setDropdownVisible(false);
    }
  };

  const selectedOption = options.find(option => option.value === value);

  return (
    <View style={{position: 'relative', width: '100%'}}>
      <TouchableOpacity
        style={[styles.select, style]}
        onPress={() => !disabled && setDropdownVisible(prev => !prev)}
        disabled={disabled}>
        <Text style={styles.selectText}>
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
      </TouchableOpacity>

      <View
        style={[
          styles.iconWrap,
          {
            transform: isDropdownVisible ? 'rotate(180deg)' : 'rotate(0deg)',
          },
        ]}>
        <DropDown />
      </View>

      {isDropdownVisible && (
        <TouchableWithoutFeedback onPress={() => setDropdownVisible(false)}>
          <View style={styles.dropdownContainer}>
            <FlatList
              data={options}
              keyExtractor={item =>
                item.value.toString() + item.index?.toString() || ''
              }
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => handleSelect(item.value)}>
                  <Text style={styles.optionText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  select: {
    borderRadius: 10,
    paddingTop: 12,
    paddingBottom: 14,
    paddingHorizontal: 20,
    borderColor: '#8C8C8C',
    borderWidth: 1,
    color: '#8C8C8C',
    fontSize: 13,
    fontWeight: '400',
    position: 'relative',
  },
  selectText: {
    color: '#8C8C8C',
    fontSize: 13,
    fontWeight: '400',
  },
  dropdownContainer: {
    position: 'absolute',
    top: '110%',
    left: 0,
    right: 0,
    backgroundColor: 'rgba(239, 239, 239, 1)', 
    borderRadius: 10,
    borderColor: '#8C8C8C',
    borderWidth: 1,
    maxHeight: 200,
    zIndex: 1000,
    elevation: 5,
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 }, // iOS shadow
    shadowOpacity: 0.25, // iOS shadow
    shadowRadius: 3.84, // iOS shadow
  },
  
  option: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  optionText: {
    fontSize: 14,
    color: '#000018',
  },
  iconWrap: {
    position: 'absolute',
    top: '30%',
    right: 20,
  },
});
