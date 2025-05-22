import {FC} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
type Props = {
  onPress: (i: number) => void;
};
export const Feed: FC<Props> = ({onPress}) => {
  return (
    <View style={[styles.page, {backgroundColor: '#ffebcd'}]}>
      <Pressable onPress={() => onPress(1)}>
        <Text>Go to DMs</Text>
      </Pressable>
      <Text style={styles.text}>📸 Feed</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  text: {fontSize: 24, fontWeight: 'bold'},
});
