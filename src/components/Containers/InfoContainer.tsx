import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {ReactNode} from 'react';

interface InfoContainerProps {
  Icon: ReactNode;
  title: string;
  content: string;
  width?: any
}

export const InfoContainer = ({
  Icon,
  title,
  content,
  width= '100%'
}: InfoContainerProps): JSX.Element => {
  return (
    <View style={[styles.container, {width: width}]}>
      <View style={styles.iconWrapper}>{Icon}</View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  iconWrapper: {
    backgroundColor: '#02447F',
    paddingHorizontal: 8,
    paddingVertical: 4,
    width: 34,
    borderRadius: 25,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000018',
  },
  content: {
    fontSize: 13,
    fontWeight: '400',
    color: '#8C8C8C',
    lineHeight: 18
  },
});
