import {View, Text} from 'react-native';
import React, {FC} from 'react';
import {IMainStackScreens} from '../navigation/types';

type Props = IMainStackScreens<'GestureHandler'>;
const GestureHandler: FC<Props> = () => {
  return (
    <View>
      <Text>GestureHandler</Text>
    </View>
  );
};

export default GestureHandler;
