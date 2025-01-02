import {View, Text, ViewStyle, Animated, TouchableOpacity} from 'react-native';
import React from 'react';
interface ScalePressProps {
  onPress?: () => void;
  onLongPress?: () => void;
  children: React.ReactNode;
  style?: ViewStyle;
}
const ScalePress: React.FC<ScalePressProps> = ({
  onPress,
  onLongPress,
  children,
  style,
}) => {
  const scaleValue = new Animated.Value(1);
  const onPressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.8,
      useNativeDriver: true,
    }).start();
  };
  const onPressOut = () => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={style}
      onPress={onPress}
      onLongPress={onLongPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}>
      <Animated.View
        style={[{transform: [{scale: scaleValue}], width: '100%'}]}>
        {children}
      </Animated.View>
    </TouchableOpacity>
  );
};

export default ScalePress;
