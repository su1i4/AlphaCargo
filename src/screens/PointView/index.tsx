import { StyleSheet, ScrollView, View} from 'react-native';

export const PointView = ({route}: any) => {
  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <View style={styles.Wrapper}></View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  Wrapper: {
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
    height: '100%',
  },
});
