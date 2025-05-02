import {View, Text, Pressable} from 'react-native';
import React, {FC} from 'react';
import {IMainStackScreens} from '../navigation/types';
import Toast, {ToastPosition, ToastType} from 'react-native-toast-message';
type ToastData = {
  type: ToastType;
  position: ToastPosition | undefined;

  text: string;
};
const toastData: ToastData[] = [
  {
    position: 'top',
    type: 'success',
    text: 'Top Success Toast',
  },
  {
    position: 'bottom',
    type: 'success',
    text: 'Bottom Success Toast',
  },
  {
    position: 'top',
    type: 'error',
    text: 'Top Error Toast',
  },
  {
    position: 'bottom',
    type: 'error',
    text: 'Bottom Error Toast',
  },
  {
    position: 'top',
    type: 'info',
    text: 'Top Info Toast',
  },
  {
    position: 'bottom',
    type: 'info',
    text: 'Bottom Info Toast',
  },
  {
    position: 'top',
    text: 'safafafs',
    type: 'customToast',
  },
];

const bgColorFinder = (t: ToastType) => {
  switch (t) {
    case 'error':
      return 'red';
    case 'info':
      return 'lightblue';
    case 'success':
      return 'lightgreen';

    default:
      return 'lightgrey';
  }
};

type Props = IMainStackScreens<'Toast'>;
const ToastMessages: FC<Props> = () => {
  const showToast_ = (t: ToastData) => {
    ///
    Toast.show({
      type: t.type,
      position: t.position,
      text1: t.text,
    });
  };
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 16,
        rowGap: 12,
        alignItems: 'center',
        marginTop: 20,
      }}>
      {toastData.map((t, ix) => (
        <Pressable
          style={{
            backgroundColor: bgColorFinder(t.type),
            width: '100%',
            borderWidth: 1,
            borderRadius: 9,
            paddingVertical: 10,
            alignItems: 'center',
            paddingHorizontal: 10,
          }}
          key={ix}
          onPress={() => showToast_(t)}>
          <Text style={{fontSize: 16}}>
            {t.type} - {t.position}{' '}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

export default ToastMessages;
