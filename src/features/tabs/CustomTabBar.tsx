import {View, Text, StyleSheet} from 'react-native';
import React, {FC} from 'react';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {BOTTOM_TAB_HEIGHT, Colors} from '../../utils/Constants';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ScalePress from '../../components/ui/ScalePress';
import {HomeTabIcon, LibraryTabIcon, SearchTabIcon} from './TabIcons';
import { useSharedState } from './SharedContext';

const CustomTabBar: FC<BottomTabBarProps> = props => {
  const {state, navigation} = props;
  const safeAreaInsets = useSafeAreaInsets();
  const {translationY}=useSharedState()
  const animatedSatyle=useAnimatedStyle(()=>{
    return {
      transform:[{translateY:-translationY.value}]
    }
  })
  return (
    <Animated.View
      style={[styles.tabBarContainer,animatedSatyle, {paddingBottom: safeAreaInsets.bottom}]}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const onPress = () => {
            console.log('onPress', state.index,index)
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: state.key,
          });
        };
        return (
          <ScalePress
            key={index}
            // onLongPress={onLongPress}
            onPress={onPress}
            style={styles.tabItem}>
            {route?.name === 'Home' && <HomeTabIcon focused={isFocused} />}
            {route?.name === 'Search' && (
              <SearchTabIcon focused={isFocused} />
            )}
            {route?.name === 'Library' && (
              <LibraryTabIcon focused={isFocused} />
            )}
          </ScalePress>
        );
      })}
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  tabBarContainer: {
    backgroundColor: Colors.background,
    width: '100%',
    height: BOTTOM_TAB_HEIGHT,
    position: 'absolute',
    bottom: 0,
    paddingTop: 10,
    zIndex: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tabItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomTabBar;
