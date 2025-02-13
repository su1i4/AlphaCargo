import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
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
  label?: string;
}

export const Select = ({
  value,
  onChange,
  placeholder,
  options,
  style,
  disabled = false,
  label,
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
      {label && <Text style={{fontSize: 15, marginBottom: 5}}>{label}</Text>}
      <TouchableOpacity
        style={[styles.select, style]}
        onPress={() => !disabled && setDropdownVisible(true)}
        disabled={disabled}>
        <Text style={selectedOption ? styles.selectText : styles.placeHolder}>
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

      <Modal
        transparent
        visible={isDropdownVisible}
        animationType="fade"
        onRequestClose={() => setDropdownVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setDropdownVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.dropdownContainer}>
              {options.map((item, index) => (
                <TouchableOpacity
                  key={`${item.value}-${index}`}
                  style={styles.option}
                  onPress={() => handleSelect(item.value)}>
                  <Text style={styles.optionText}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
    color: 'black',
    fontSize: 15,
    fontWeight: '400',
  },
  placeHolder: {
    color: '#8C8C8C',
    fontSize: 13,
    fontWeight: '400',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: '#8C8C8C',
    borderWidth: 1,
    maxHeight: '70%',
    width: '90%',
    overflow: 'scroll',
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
    top: '50%',
    right: 20,
  },
});
