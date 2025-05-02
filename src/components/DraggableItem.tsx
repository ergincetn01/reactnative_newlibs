// DraggableListItem.tsx
import React from 'react';
import {Pressable, Text} from 'react-native';
import SwipeItem from './SwipeItem';

type Item = {
  title: string;
};

type Props = {
  item: Item;
  drag: () => void;
  getIndex: () => number | undefined;
};

const DraggableListItem = ({item, drag, getIndex}: Props) => {
  return (
    <Pressable
      onLongPress={drag}
      style={{
        width: '100%',
      }}
      key={getIndex()}>
      <SwipeItem backgroundColor="red" onDelete={() => {}}>
        <Text>{item.title}</Text>
      </SwipeItem>
    </Pressable>
  );
};

export default DraggableListItem;
