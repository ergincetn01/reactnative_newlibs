import React, {useState} from 'react';
import {useWindowDimensions} from 'react-native';
import {TabView} from 'react-native-tab-view';
import {Feed} from './Feed';
import {DMs} from './DMs';

export default function InstagramSwipeLayout() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'feed', title: 'Feed'},
    {key: 'dms', title: 'DMs'},
  ]);

  const renderScene = ({route}: {route: {key: string}}) => {
    switch (route.key) {
      case 'feed':
        return <Feed onPress={() => setIndex(1)} />;
      case 'dms':
        return <DMs />;
      default:
        return null;
    }
  };

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      swipeEnabled={true}
      renderTabBar={() => null}
    />
  );
}
