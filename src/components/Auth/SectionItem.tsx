import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import ArrowRight from '../../assets/icons/ArrowRight';

interface SectionProps {
  Icon: any;
  title: string;
  onPress: any;
  style?: object;
}

const SectionItem = ({Icon, title, onPress, style}: SectionProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <View style={styles.iconContainer}>
        <Icon />
      </View>
      <Text style={styles.title}>{title}</Text>
      <ArrowRight size={17} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#FFFFFF'
  },
  iconContainer: {
    marginRight: 16,
  },
  title: {
    flex: 1,
    fontSize: 13,
    color: '#000018',
  },
  chevron: {
    marginLeft: 'auto',
  },
});

export default SectionItem;
