import {
  View,
  Text,
  Pressable,
  TextInput,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import {copyToClipboard} from '../helpers/clipboardHelper';

const ClipboardActions = () => {
  const [text_, setText] = useState<string>('');
  const [copiedText, setCopiedText] = useState<string>('');

  const pasteText = async () => {
    try {
      const txt = await Clipboard.getString();
      if (txt) {
        setCopiedText(txt);
      }
    } catch {
      console.error('error');
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{alignItems: 'center'}}
      style={styles.scrollView}>
      <View style={styles.textFieldContainer}>
        <TextInput
          style={styles.textInput}
          value={text_}
          onChangeText={(text: string) => setText(text)}
        />
      </View>
      <Pressable style={styles.button} onPress={() => copyToClipboard(text_)}>
        <Text>Copy to clipboard</Text>
      </Pressable>
      <Text selectable> Current Text: {text_} </Text>
      <Pressable style={styles.button} onPress={pasteText}>
        <Text>Paste from clipboard</Text>
      </Pressable>
      <Text selectable>Pasted Text: {copiedText}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 12,
    paddingVertical: 5,
    paddingHorizontal: 12,
    backgroundColor: 'lightblue',
    borderRadius: 10,
  },
  textFieldContainer: {
    width: '100%',
    paddingHorizontal: 12,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  scrollView: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 30,
  },
  textInput: {width: '100%', textAlign: 'center'},
});

export default ClipboardActions;
