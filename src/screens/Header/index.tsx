import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {ReactNode} from 'react';

interface HeaderProps {
  children?: ReactNode;
  text: string;
  Right: any;
  Left?: any;
}

export default function Header({
  children,
  text,
  Right,
  Left,
}: HeaderProps): JSX.Element {
  return (
    <View style={styles.header}>
      <View style={styles.container}>
        {Left ? (
          <TouchableOpacity>
            <Left />
          </TouchableOpacity>
        ) : (
          <View style={{width: 25}} />
        )}
        <Text style={styles.text}>{text}</Text>
        <TouchableOpacity>
          <Right />
        </TouchableOpacity>
      </View>
      {children && children}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    backgroundColor: '#02447F',
    position: 'static',
    top: 0
  },
  container: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: '#F9FFFF',
    fontSize: 18,
    fontWeight: '600',
    paddingBottom: 5
  },
});
