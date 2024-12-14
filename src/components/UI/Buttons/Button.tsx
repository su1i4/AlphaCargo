import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import LoadingIcon from '../../../assets/icons/LoadingIcon';

interface ButtonProps {
  title: any;
  onClick: () => void;
  style?: object;
  textStyle?: object;
  isLoading?: boolean;
  disabled?: boolean
  loadingColor?: string
}

export const ButtonCustom = ({
  title,
  onClick,
  style,
  textStyle,
  isLoading = false,
  disabled = false,
  loadingColor = '#FFFFFF'
}: ButtonProps) => {
  const paddingTop = isLoading ? 10 : 12;
  const paddingBottom = isLoading ? 12 : 14;
  return (
    <TouchableOpacity
      onPress={() => disabled? false: onClick()}
      style={[
        styles.button,
        style,
        {paddingTop: paddingTop, paddingBottom: paddingBottom},
      ]}>
      {isLoading ? (
        <LoadingIcon color={loadingColor} />
      ) : (
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#02447F',
    paddingTop: 12,
    paddingBottom: 14,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#F9FFFF',
    fontSize: 14,
    fontWeight: '400',
  },
});
