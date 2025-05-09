import Clipboard from '@react-native-clipboard/clipboard';
import Toast, {ToastPosition} from 'react-native-toast-message';

export const copyToClipboard = async (t: string, pos?: ToastPosition) => {
  try {
    await Clipboard.setString(t);
    Toast.show({
      type: 'info',
      text1: 'Copied to clipboard!',
      position: pos ? pos : 'bottom',
      autoHide: true,
      visibilityTime: 2000,
    });
  } catch {
    console.log('error');
  }
};
