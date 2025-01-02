import HomeFocused from '../../assets/icons/home_focused.png';
import SearchedFocused from '../../assets/icons/search_focused.png';
import LibraryFocused from '../../assets/icons/library_focused.png';
import Home from '../../assets/icons/home.png';
import Search from '../../assets/icons/search.png';
import Library from '../../assets/icons/library.png';

import {
  View,
  Text,
  ViewStyle,
  TextStyle,
  Image,
  ImageStyle,
} from 'react-native';
import React, {FC} from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import {Colors, Fonts} from '../../utils/Constants';
import {fontR} from '../../utils/Scaling';
import CustomText from '../../components/ui/CustomText';

interface TabProps {
  name: string;
}
interface IconProps {
  focused: boolean;
}

const styles: ImageStyle = {
  width: RFValue(18),
  height: RFValue(18),
};
const tabStyles: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
};

const textStyleInActive: TextStyle = {
  textAlign: 'center',
  marginTop: 4,
  color: Colors.inactive,
  fontSize: fontR(9.5),
};

const textStyleActive: TextStyle = {
  textAlign: 'center',
  marginTop: 4,
  color: Colors.text,
  fontSize: fontR(9.5),
};
const TabIcon: FC<TabProps> = ({name}) => {
  return (
    <View style={tabStyles}>
      <Image
        source={name === 'Home' ? Home : name === 'Search' ? Search : Library}
        style={[styles]}
      />
      <CustomText style={textStyleInActive}>{name}</CustomText>
    </View>
  );
};

const TabIconFocused: FC<TabProps> = ({name}) => {
  return (
    <View style={tabStyles}>
      <Image
        source={
          name === 'Home'
            ? HomeFocused
            : name === 'Search'
            ? SearchedFocused
            : LibraryFocused
        }
        style={[styles]}
      />
      <CustomText fontFamily={Fonts.Bold} style={textStyleActive}>
        {name} 
      </CustomText>
 
    </View>
  );
};

export const HomeTabIcon: FC<IconProps> = ({focused}) => {
  return focused ? <TabIconFocused name="Home" /> : <TabIcon name="Home" />;
};
export const SearchTabIcon: FC<IconProps> = ({focused}) => {
  return focused ? <TabIconFocused name="Search" /> : <TabIcon name="Search" />;
};
export const LibraryTabIcon: FC<IconProps> = ({focused}) => {
  return focused ? (
    <TabIconFocused name="Library" />
  ) : (
    <TabIcon name="Library" />
  );
};
