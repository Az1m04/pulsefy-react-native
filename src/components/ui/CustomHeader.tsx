import {View, Text, StyleSheet, Image} from 'react-native';
import React, {FC} from 'react';
import CustomText from './CustomText';
import {Fonts} from '../../utils/Constants';
import {fontR} from '../../utils/Scaling';

const CustomHeader: FC<{title: string}> = ({title}) => {
  return (
    <View style={style.flexRow}>
      <Image source={require("../../assets/images/logo_text.png")} style={style.img} />
      <CustomText
        fontFamily={Fonts.Medium}
        fontSize={fontR(12)}
        style={style.text}>
        {title}
      </CustomText>
    </View>
  );
};
const style = StyleSheet.create({
  img: {
    width: 140,
    height: 50,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  flexRow: {
    gap: 10,
  },
  text: {
    marginTop: 2,
  },
});
export default CustomHeader;
