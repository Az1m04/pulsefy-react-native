import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import CustomSafeAreaView from '../../components/ui/CustomSafeAreaView';
import CustomHeader from '../../components/ui/CustomHeader';
import Icon from '../../components/ui/Icon';
import CustomText from '../../components/ui/CustomText';
import { fontR, screenHeight } from '../../utils/Scaling';

const LibraryScreen = () => {
  return (
    <CustomSafeAreaView>
    <CustomHeader title="" />
    <View style={style.conatiner}>
      <Icon name="musical-note"  iconFamily='Ionicons' size={fontR(40)}/>
      <CustomText variants='h5'>
        Comming Soon!
      </CustomText>
    </View>
  </CustomSafeAreaView>

  )
}
const style = StyleSheet.create({
  conatiner: {
    height: screenHeight * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default LibraryScreen