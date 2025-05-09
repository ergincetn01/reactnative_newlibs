import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainStackType} from './types';
import GestureHandler from '../screens/GestureHandler';
import Maps from '../screens/Maps';
import FilePicker from '../screens/FilePicker';
import Home from '../screens/Home';
import ImagePicker from '../screens/ImagePicker';
import DraggableList from '../screens/DraggableList';
import ToastMessages from '../screens/Toast';
import ClipboardActions from '../screens/Clipboard';
import CalendarView from '../screens/CalendarView';
import Skeleton from '../screens/Skeleton';
import ScannerScreen from '../screens/ScannerScreen';

const Stack = createNativeStackNavigator<MainStackType>();
const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="DraggableList" component={DraggableList} />

      <Stack.Screen name="GestureHandler" component={GestureHandler} />
      <Stack.Screen name="Maps" component={Maps} />
      <Stack.Screen name="FilePicker" component={FilePicker} />
      <Stack.Screen name="ImagePicker" component={ImagePicker} />
      <Stack.Screen name="Toast" component={ToastMessages} />
      <Stack.Screen name="Clipboard" component={ClipboardActions} />
      <Stack.Screen name="Calendar" component={CalendarView} />
      <Stack.Screen name="Skeleton" component={Skeleton} />
      <Stack.Screen name="QRScanner" component={ScannerScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
