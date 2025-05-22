import {StyleSheet, Text, View} from 'react-native';

export const DMs = () => (
  <View style={[styles.page, {backgroundColor: '#d1e7ff'}]}>
    <Text style={styles.text}>✉️ DMs</Text>
  </View>
);

const styles = StyleSheet.create({
  page: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  text: {fontSize: 24, fontWeight: 'bold'},
});
