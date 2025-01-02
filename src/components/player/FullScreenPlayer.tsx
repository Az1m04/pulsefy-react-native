import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {fontR, screenHeight, screenWidth} from '../../utils/Scaling';
import {useSharedState} from '../../features/tabs/SharedContext';
import {usePlayerStore} from '../../state/usePlayerStore';
import ImageColors from 'react-native-image-colors';
import {Colors, darkenColor, Fonts} from '../../utils/Constants';
import LinearGradient from 'react-native-linear-gradient';
import Icon from '../ui/Icon';
import CustomText from '../ui/CustomText';
import {Image} from 'react-native';
import VideoPlayer from './VideoPlayer';
import ControlsAndDetails from './ControlsAndDetails';
import TrackPlayer from 'react-native-track-player';

const FullScreenPlayer = () => {
  const [colors, setColors] = useState(['#666', '#666']);

  const {collapselayer} = useSharedState();

  const {currentPlayingTrack} = usePlayerStore();
const acrtiveTrack=async()=>{
  const activeTrack = await TrackPlayer.getCurrentTrack();
  console.log('activeTrack', activeTrack)
}
  useEffect(() => {
    acrtiveTrack()
    const url = currentPlayingTrack?.artwork_uri;
    ImageColors.getColors(url, {
      fallback: '#666',
      cache: true,
      key: url,
    }).then((c: any) => {
      const color = Platform.OS == 'ios' ? c.secondary : c.vibrant;
      const darkenedSecondary = darkenColor(color);
      setColors([darkenedSecondary, darkenedSecondary]);
    });
  }, [currentPlayingTrack]);

  
  return (
    <View style={styles.conatiner}>
      {currentPlayingTrack?.video_uri ? (
        <VideoPlayer video_uri={currentPlayingTrack?.video_uri} />
      ) : (
        <View style={styles.imageContainer}>
          <Image source={currentPlayingTrack?.artwork_uri} style={styles.img} />
        </View>
      )}
      <LinearGradient
        style={styles.gradient}
        colors={[...colors, 'rgba(0,0,0,0.9)']}
      />
      <View style={styles.flexRowBetween}>
        <TouchableOpacity onPress={collapselayer}>
          <Icon
            name="chevron-down-sharp"
            iconFamily="Ionicons"
            size={fontR(20)}
          />
        </TouchableOpacity>
        <CustomText fontFamily={Fonts.Black} variants="h6">
          {currentPlayingTrack?.artist?.name}
        </CustomText>
        <Icon
          name="ellipsis-horizontal-sharp"
          iconFamily="Ionicons"
          size={fontR(20)}
        />
      </View>
      <View style={styles.albumContainer} />
      <ControlsAndDetails />
    </View>
  );
};
const styles = StyleSheet.create({
  conatiner: {
    width: '100%',
    // backgroundColor: Colors.background,
  },
  gradient: {
    height: screenHeight,
    width: screenWidth,
    zIndex: -3,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  flexRowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginTop: Platform.OS === 'ios' ? 50 : 30,
  },
  albumContainer: {
    width: '100%',
    // backgroundColor: Colors.background,
    height: screenHeight * 0.52,
  },
  imageContainer: {
    position: 'absolute',
    width: screenWidth * 0.9,
    height: screenHeight * 0.42,
    overflow: 'hidden',
    borderRadius: 10,
    alignSelf: 'center',
    top: screenHeight * 0.17,
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
export default FullScreenPlayer;
