import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {ReactNode} from 'react';
import CloseIcon from '../../assets/icons/CloseIcons';

interface LoginContainerProps {
  children: ReactNode;
  text: string;
  isClose: boolean;
}

export const LoginContainer = ({
  children,
  text,
  isClose,
}: LoginContainerProps): JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>{text}</Text>
        {isClose && (
          <TouchableOpacity>
            <CloseIcon size={20} />
          </TouchableOpacity>
        )}
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    gap: 16,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 18,
    color: '#000018',
    fontWeight: '600',
  },
});
