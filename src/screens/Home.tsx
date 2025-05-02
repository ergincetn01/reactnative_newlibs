import {View, Text, Pressable} from 'react-native';
import React, {FC} from 'react';
import {IMainStackScreens, MainStackType} from '../navigation/types';

type NavData = {
  name: keyof MainStackType;
};
const NavigationData: NavData[] = [
  {
    name: 'FilePicker',
  },
  {
    name: 'ImagePicker',
  },
  {
    name: 'Maps',
  },
  {
    name: 'GestureHandler',
  },
  {
    name: 'DraggableList',
  },
  {
    name: 'Toast',
  },
  {
    name: 'Clipboard',
  },
  {
    name: 'Calendar',
  },
];

type Props = IMainStackScreens<'Home'>;
const Home: FC<Props> = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', paddingTop: 30}}>
      <View style={{rowGap: 16, alignItems: 'center'}}>
        {NavigationData.map((n, ix) => (
          <Pressable
            key={ix}
            style={{
              borderColor: 'black',
              borderWidth: 1,
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 16,
            }}
            onPress={() => navigation.navigate(n.name)}>
            <Text style={{fontSize: 19}}>{n.name}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default Home;
