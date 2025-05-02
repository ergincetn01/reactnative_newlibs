import {View, Text, Pressable, TextInput} from 'react-native';
import React, {useState} from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-toast-message';

const ClipboardActions = () => {
  const [text_, setText] = useState<string>('');
  const [copiedText, setCopiedText] = useState<string>('');

  const copyToClipboard = async () => {
    try {
      await Clipboard.setString(text_);
      Toast.show({
        type: 'success',
        text1: 'Copied to clipboard!',
        position: 'bottom',
        autoHide: true,
        visibilityTime: 1000,
      });
    } catch {
      console.log('error');
    }
  };

  const pasteText = async () => {
    try {
      const txt = await Clipboard.getString();
      if (txt) {
        setCopiedText(txt);
      }
    } catch {
      console.error('ERRRRRR');
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        marginTop: 20,
        paddingHorizontal: 30,
      }}>
      <View
        style={{
          width: '100%',
          paddingHorizontal: 12,
          paddingVertical: 0,
          borderRadius: 9,
          alignItems: 'center',
          borderWidth: 1,
        }}>
        <TextInput
          value={text_}
          onChangeText={(text: string) => setText(text)}
        />
      </View>
      <Pressable
        style={{
          marginTop: 12,
          paddingVertical: 5,
          paddingHorizontal: 12,
          backgroundColor: 'lightblue',
        }}
        onPress={copyToClipboard}>
        <Text>Copy to clipboard</Text>
      </Pressable>
      <Text selectable> TEXT: {text_} </Text>
      <Pressable
        style={{
          marginTop: 12,
          paddingVertical: 5,
          paddingHorizontal: 12,
          backgroundColor: 'lightblue',
        }}
        onPress={pasteText}>
        <Text>Paste from clipboard</Text>
      </Pressable>
      <Text selectable>COPIED TEXT: {copiedText} </Text>
    </View>
  );
};

export default ClipboardActions;
