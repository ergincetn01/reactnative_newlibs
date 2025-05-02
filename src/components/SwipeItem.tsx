// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   ViewProps,
//   Animated,
// } from 'react-native';
// import React, {FC, useEffect, useRef} from 'react';
// import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
// import Reanimated, {
//   SharedValue,
//   useAnimatedStyle,
//   useSharedValue,
//   withTiming,
// } from 'react-native-reanimated';

// const swipeWidth = 75;

// type Props = {
//   children: React.ReactNode;
//   rightText: string | React.ReactNode;
//   style?: ViewProps['style'];
// };

// const SwipeItem: FC<Props> = ({children, style, rightText}) => {
//   const animatedX = useSharedValue(0);

//   useEffect(() => {
//     animatedX.value = withTiming(swipeWidth, {duration: 100});
//   }, []);

//   const animatedStyles = useAnimatedStyle(() => ({
//     width: animatedX.value,
//   }));
//   const RenderRightActions = () => {
//     return (
//       <Animated.View
//         style={[
//           animatedStyles,
//           {
//             flexDirection: 'row',
//             borderBottomWidth: StyleSheet.hairlineWidth,
//             borderBottomColor: '#C5C5C5',
//           },
//         ]}>
//         <Text>SAAAAĞĞĞ</Text>
//       </Animated.View>
//     );
//   };
//   return (
//     <View
//       style={[
//         style,
//         {
//           flex: 1,
//         },
//       ]}>
//       <Swipeable
//         rightThreshold={40}
//         friction={2}
//         renderRightActions={RenderRightActions}
//         overshootLeft={false}
//         overshootRight={false}>
//         {children}
//       </Swipeable>
//     </View>
//   );
// };

// export default SwipeItem;

import React, {FC} from 'react';
import {Animated, Pressable, StyleSheet, Text, View} from 'react-native';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import {Extrapolation, interpolate, SharedValue} from 'react-native-reanimated';

const swipeableWidth = 75;
interface IProps {
  children: React.ReactNode;
  backgroundColor: string;
  onDelete: () => void;
}
const SwipeItem: FC<IProps> = ({onDelete, children, backgroundColor}) => {
  const renderRightActions = (
    _progress: SharedValue<number>,
    dragX: SharedValue<number>,
  ) => {
    const scale = interpolate(
      dragX.value,
      [-80, 0],
      [1, 0],
      Extrapolation.CLAMP,
    );

    return (
      <Animated.View style={[styles.swipeContainer, {transform: [{scale}]}]}>
        <Pressable
          style={StyleSheet.flatten([
            styles.viewContainer,
            styles.item_container,
          ])}
          onPress={onDelete}>
          <Text>Delete</Text>
        </Pressable>
      </Animated.View>
    );
  };

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <Swipeable
        renderRightActions={renderRightActions}
        friction={2}
        overshootLeft={false}
        overshootRight={false}
        enableTrackpadTwoFingerGesture
        rightThreshold={40}>
        {children}
      </Swipeable>
    </View>
  );
};

export default SwipeItem;
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 12,
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#C5C5C5',
  },
  viewContainer: {
    backgroundColor: '#EBF8FD',
  },
  item_container: {
    alignItems: 'center',
    padding: 12,
    justifyContent: 'center',
    flex: 1,
  },
  swipeContainer: {
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#C5C5C5',
    width: 150,
  },
});
