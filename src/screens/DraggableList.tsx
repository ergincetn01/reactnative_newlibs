import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import DraggableFlatList, {
  RenderItem,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';

type Item = {
  title: string;
};
const DraggableList = () => {
  const [data_, setData] = useState<Item[]>([
    {
      title: '111111111111',
    },
    {title: '222222222222'},
    {title: '3333333333'},
  ]);

  const renderItem: RenderItem<Item> = ({item, drag, getIndex}) => {
    return (
      <ScaleDecorator>
        <TouchableOpacity
          onLongPress={drag}
          style={{
            width: '100%',
            borderWidth: 1,
            paddingLeft: 12,
            borderRadius: 8,
            paddingVertical: 8,
          }}
          key={getIndex()}>
          <Text>{item.title}</Text>
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };
  return (
    <View style={{backgroundColor: '#fff', flex: 1, paddingTop: 20}}>
      <DraggableFlatList
        contentContainerStyle={{
          paddingHorizontal: 12,
          rowGap: 10,
          backgroundColor: '#fff',
        }}
        keyExtractor={(item, ix) => ix.toString()}
        data={data_}
        renderItem={renderItem}
        onDragEnd={({data}) => setData(data)}
      />
    </View>
  );
};

export default DraggableList;
