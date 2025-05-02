import {View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import {toastConfig} from './src/helpers/toastConfig';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <NavigationContainer>
          <StackNavigator />
          <Toast config={toastConfig} autoHide={true} visibilityTime={3000} />
        </NavigationContainer>
      </View>
    </GestureHandlerRootView>
  );
};

export default App;
