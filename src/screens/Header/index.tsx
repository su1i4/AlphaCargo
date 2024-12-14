import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {SearchInput} from '../../components/UI/SearchInput';

interface HeaderProps {
  text: string;
  Right?: any;
  Left?: any;
  isSearch?: boolean;
  value?: string;
  onChange?: any;
  placeholder?: string;
  id: string;
  func?: any;
  funcLeft?: any;
}

export default function Header({
  text,
  Right,
  Left,
  isSearch = false,
  value = '',
  onChange,
  placeholder = '',
  id = 'afqf',
  func,
  funcLeft,
}: HeaderProps): JSX.Element {
  return (
    <View style={styles.header}>
      <View
        style={[
          styles.container,
          {
            paddingBottom: isSearch ? 10 : 20,
            justifyContent: !Left && !Right ? 'center' : 'space-between',
          },
        ]}>
        {Left ? (
          <TouchableOpacity onPress={() => (funcLeft ? funcLeft() : false)}>
            <Left />
          </TouchableOpacity>
        ) : (
          <View style={{width: 25}} />
        )}
        <Text style={styles.text}>{text}</Text>
        {Right ? (
          <TouchableOpacity onPress={() => (func ? func() : false)}>
            <Right />
          </TouchableOpacity>
        ) : (
          <View style={{width: 25}}></View>
        )}
      </View>
      {isSearch && (
        <View style={styles.component}>
          <SearchInput
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    backgroundColor: '#02447F',
    position: 'static',
    top: 0,
  },
  container: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 40,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: '#F9FFFF',
    fontSize: 18,
    fontWeight: '600',
    paddingBottom: 5,
  },
  component: {
    paddingHorizontal: 20,
    paddingBottom: 15,
    height: 'auto',
  },
});
