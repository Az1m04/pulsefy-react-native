import {Platform, StyleSheet, Text, View, Image} from 'react-native';
import React, {FC, useEffect, useRef, useState} from 'react';
import {Colors, darkenColor, Fonts} from '../../utils/Constants';
import ImageColors from 'react-native-image-colors';
import TrackPlayer, {
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';
import {usePlayerStore} from '../../state/usePlayerStore';
import {fontR, screenWidth} from '../../utils/Scaling';
import SlidingText from '../ui/SlidingText';
import CustomText from '../ui/CustomText';
import ScalePress from '../ui/ScalePress';
import Icon from '../ui/Icon';
import Slider from '@react-native-community/slider';
import PackageIcon from 'react-native-vector-icons/MaterialIcons';

const ControlsAndDetails: FC = () => {
  const [icon, setIcon] = useState();
  const progress = useProgress();
  const state: any = usePlaybackState();
  const isPlaying = state === 'playing';

  const {
    play,
    pause,
    resume,
    currentPlayingTrack,
    isRepeating,

    toggleRepeat,
    toggleSuffle,
    previous,
    next,
  } = usePlayerStore();

  const formatTime = (seconds: number = 0): string => {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  const togglePlayback = () => {
    if (isPlaying) {
      pause();
    } else {
      resume();
    }
    if (state === 'none') {
      play();
    }
  };

  const handleSeek = async (value: any) => {
    await TrackPlayer.seekTo(value * progress?.duration);
  };

  useEffect(() => {
    PackageIcon.getImageSource('circle', 15, 'white').then(setIcon);
  }, []);

  const handleLooping = () => {
    if (isRepeating) {
      toggleSuffle();
    } else {
      toggleRepeat();
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.flexRowBetween}>
        <View style={{width: '68%'}}>
          <SlidingText
            fontFamily={Fonts.Bold}
            fontSize={fontR(14)}
            text={currentPlayingTrack?.title}
          />
          <CustomText
            fontFamily={Fonts.Medium}
            numberOfLines={1}
            fontSize={fontR(9)}
            style={styles.artist}>
            {currentPlayingTrack?.artist?.name}
          </CustomText>
        </View>
        <ScalePress>
          <Icon
            name="add-circle-outline"
            iconFamily="MaterialICons"
            size={fontR(28)}
          />
        </ScalePress>
      </View>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        value={progress?.position / progress?.duration || 0}
        tapToSeek
        onSlidingComplete={handleSeek}
        thumbImage={icon}
        minimumTrackTintColor="#fff"
        maximumTrackTintColor="rgba(255,255,255,0.2)"
      />
      <View style={styles.timeZone}>
        <CustomText fontSize={fontR(7)}>
          {formatTime(progress?.position)}{' '}
        </CustomText>
        <CustomText fontSize={fontR(7)}>
          {formatTime(progress?.duration - progress?.position)}{' '}
        </CustomText>
      </View>
      <View style={styles.flexRowBetween}>
        <ScalePress onPress={handleLooping}>
          <Icon
            name={isRepeating ? 'repeat' : 'shuffle'}
            iconFamily="Ionicons"
            color={Colors.primary}
            size={fontR(22)}
          />
        </ScalePress>
        <ScalePress onPress={previous}>
          <Icon
            name={'play-skip-back-sharp'}
            iconFamily="Ionicons"
            // color={Colors.primary}
            size={fontR(26)}
          />
        </ScalePress>

        <ScalePress onPress={togglePlayback}>
          <Icon
            name={isPlaying ? 'pause-circle-sharp' : 'play-circle-sharp'}
            iconFamily="Ionicons"
            // color={Colors.primary}
            size={fontR(50)}
          />
        </ScalePress>
        <ScalePress onPress={next}>
          <Icon
            name={'play-skip-forward-sharp'}
            iconFamily="Ionicons"
            // color={Colors.primary}
            size={fontR(26)}
          />
        </ScalePress>
        <ScalePress>
          <Icon
            name={'alarm'}
            iconFamily="MaterialCommunityIcons"
            // color={Colors.primary}
            size={fontR(22)}
          />
        </ScalePress>
      </View>
      <View style={styles.artistContainer}>
        <Image
          source={currentPlayingTrack?.artist?.cover_uri}
          style={styles.artistCover}
        />
        <View style={{paddingHorizontal: 20, paddingVertical: 15}}>
          <CustomText fontFamily={Fonts.Bold} fontSize={fontR(11)}>
            {currentPlayingTrack?.artist?.name}
          </CustomText>
          <CustomText
            fontFamily={Fonts.Medium}
            fontSize={fontR(8)}
            style={{opacity: 0.7}}>
            1.7Cr Monthly Listners
          </CustomText>

          <CustomText
            fontFamily={Fonts.Medium}
            fontSize={fontR(8)}
            numberOfLines={3}
            style={{marginTop: 10, opacity: 0.8}}>
            {currentPlayingTrack?.artist?.bio}
          </CustomText>
        </View>
      </View>

      <View style={styles.modelConatiner}>
        <CustomText fontFamily={Fonts.Bold} fontSize={fontR(16)}>
          Spotify x Azim
        </CustomText>
        <CustomText fontFamily={Fonts.Bold} fontSize={fontR(12)}>
          made with ♥
        </CustomText>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    zIndex: 88,
  },
  subText: {
    marginTop: 2,
    opacity: 0.8,
  },
  titleText: {
    marginTop: 10,
  },
  modelConatiner: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
    marginBottom: 40,
    opacity: 0.6,
  },
  artistContainer: {
    backgroundColor: Colors.backgroundLight,
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 40,
  },
  infoContainer: {
    backgroundColor: Colors.backgroundLight,
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 20,
    padding: 10,
  },
  artistCover: {
    height: 200,
    width: '100%',
    resizeMode: 'cover',
  },
  slider: {
    // flex:1,
    width: Platform.OS === 'android' ? screenWidth : screenWidth - 30,
    height: 40,
    alignSelf: 'center',
    marginTop: 10,
  },
  timeZone: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    bottom: 10,
  },
  flexRowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  artist: {
    opacity: 0.8,
    marginTop: 5,
  },
});

export default ControlsAndDetails;
