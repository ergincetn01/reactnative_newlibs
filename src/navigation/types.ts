import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type MainStackType = {
  Home: undefined;
  GestureHandler: undefined;
  Maps: undefined;
  FilePicker: undefined;
  ImagePicker: undefined;
  DraggableList: undefined;
  Toast: undefined;
  Clipboard: undefined;
  Calendar: undefined;
  Skeleton: undefined;
};

export type IMainStackScreens<T extends keyof MainStackType> =
  NativeStackScreenProps<MainStackType, T>;
