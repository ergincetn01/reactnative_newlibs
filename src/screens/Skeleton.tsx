import {View, Text, Dimensions} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {IMainStackScreens} from '../navigation/types';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
const {width} = Dimensions.get('screen');
type IProps = IMainStackScreens<'Skeleton'>;
const Skeleton: FC<IProps> = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 2000);
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'lightblue',
        alignItems: 'center',
        paddingTop: 20,
        paddingHorizontal: 20,
        rowGap: 12,
      }}>
      <View style={{width: '100%', justifyContent: 'flex-start'}}>
        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          visible={isVisible}
          style={{width: 50, height: 50, borderRadius: 100}}>
          <View
            style={{
              height: 50,
              width: 50,
              borderWidth: 1,
              borderRadius: 100,
              backgroundColor: 'red',
            }}
          />
        </ShimmerPlaceholder>
      </View>

      <ShimmerPlaceholder
        style={{width: '100%', height: 20, borderRadius: 15}}
        LinearGradient={LinearGradient}
        visible={isVisible}>
        <Text>dsggdgdgdsgdsgdsgdsgdg fsgshshsdhs</Text>
      </ShimmerPlaceholder>
      <View style={{flexDirection: 'row', width: '100%', columnGap: 10}}>
        <ShimmerPlaceholder
          style={{width: 40, height: 40, borderRadius: 50}}
          LinearGradient={LinearGradient}
          visible={isVisible}>
          <View style={{height: 40, width: 40}} />
        </ShimmerPlaceholder>
        <View style={{rowGap: 12, width: '100%'}}>
          {[1, 2, 3].map((d, ix) => (
            <ShimmerPlaceholder
              key={ix}
              style={{width: width - 90, height: 20, borderRadius: 15}}
              LinearGradient={LinearGradient}
              visible={isVisible}>
              <Text>{d} dsggdgdgdsgdsgdsgdsgdg fsgshshsdhs</Text>
            </ShimmerPlaceholder>
          ))}
        </View>
      </View>
    </View>
  );
};

export default Skeleton;
