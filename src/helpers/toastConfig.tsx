import {Text, View} from 'react-native';
import {
  BaseToast,
  BaseToastProps,
  ErrorToast,
  InfoToast,
} from 'react-native-toast-message';

export const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{borderLeftColor: 'green', borderLeftWidth: 12}}
      contentContainerStyle={{
        paddingHorizontal: 15,
        backgroundColor: 'lightgreen',
      }}
      text1Style={{
        fontSize: 17,
        fontWeight: '400',
      }}
    />
  ),
  error: (props: BaseToastProps) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17,
      }}
    />
  ),
  info: (props: BaseToastProps) => (
    <InfoToast
      {...props}
      style={{
        paddingVertical: 0,
        height: 40,
        borderLeftColor: 'lightgray',
        alignItems: 'center',
        backgroundColor: 'lightgray',
        justifyContent: 'center',
      }}
      text1Style={{
        textAlign: 'center',
        fontSize: 14,
      }}
    />
  ),

  //other possible custom named toasts'names can be used as type prop
  customToast: ({props}: {props: BaseToastProps}) => (
    <View
      style={{
        height: 60,
        marginHorizontal: 6,
        width: '90%',
        backgroundColor: 'purple',
      }}>
      <Text style={props.text1Style}>{props.text1}</Text>
    </View>
  ),
};
