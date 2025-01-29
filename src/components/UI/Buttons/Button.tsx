import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import LoadingIcon from '../../../assets/icons/LoadingIcon';

interface ButtonProps {
  title: any;
  onClick: () => void;
  style?: object;
  textStyle?: object;
  isLoading?: boolean;
  disabled?: boolean;
  loadingColor?: string;
}

export const ButtonCustom = ({
  title,
  onClick,
  style,
  textStyle,
  isLoading = false,
  disabled = false,
  loadingColor = '#FFFFFF',
}: ButtonProps) => {
  const paddingTop = isLoading ? 10 : 12;
  const paddingBottom = isLoading ? 12 : 14;

  return (
    <TouchableOpacity
      onPress={() => (disabled ? false : onClick())}
      disabled={disabled}
      style={[styles.touchable, style]}>
      <LinearGradient
        colors={['#203B7A', '#026297', '#006599']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}} 
        style={[
          styles.button,
          {paddingTop: paddingTop, paddingBottom: paddingBottom},
        ]}>
        {isLoading ? (
          <LoadingIcon color={loadingColor} />
        ) : (
          <Text style={[styles.buttonText, textStyle]}>{title}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  button: {
    paddingTop: 12,
    paddingBottom: 14,
    paddingHorizontal: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#F9FFFF',
    fontSize: 16,
    fontWeight: '400',
  },
});
