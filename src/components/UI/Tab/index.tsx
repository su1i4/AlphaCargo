import React, {ReactNode} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Touchable,
  TouchableOpacity,
} from 'react-native';

interface TabProps {
  children: ReactNode;
  text: string;
  active: number;
  setActive: Function;
}

export const Tab = ({children, text, active, setActive}: TabProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>{text}</Text>
      <View style={styles.innerWrapper}>
        {React.Children.map(children, (child, index) => (
          <TouchableOpacity onPress={() => setActive(index)}>
            <View key={index}>
              {React.cloneElement(child as React.ReactElement, {
                style: [
                  styles.tabItem,
                  {backgroundColor: active === index ? '#02447F' : '#8C8C8C'},
                ],
              })}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
  },
  textHeader: {
    color: '#000000',
    fontSize: 20,
    fontWeight: '600',
  },
  innerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 8,
  },
  tabItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingTop: 4,
    paddingBottom: 6,
    borderRadius: 25,
    color: '#F9FFFF',
    fontSize: 13,
    fontWeight: '400',
  },
});
