import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import React, {FC, useEffect, useRef, useState} from 'react';

import {useSharedState} from '../../features/tabs/SharedContext';
import {usePlaybackState, useProgress} from 'react-native-track-player';
import {usePlayerStore} from '../../state/usePlayerStore';
import ImageColors from 'react-native-image-colors';
import {darkenColor, Fonts} from '../../utils/Constants';
import LinearGradient from 'react-native-linear-gradient';
import SlidingText from '../ui/SlidingText';
import {fontR} from '../../utils/Scaling';
import CustomText from '../ui/CustomText';
import Icon from '../ui/Icon';
const AirPlayer: FC = () => {
  const [colors, setColors] = useState(['#666', '#666']);
  const progress = useProgress();
  const {expandPlayer} = useSharedState();
  const state: any = usePlaybackState();
  const isPlaying = state === 'playing';

  const {play, pause, resume, currentPlayingTrack} = usePlayerStore();
  useEffect(() => {
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

  const calculateProgressWith: any = () => {
    if (progress.duration > 0) {
      const percentage = (progress?.position / progress?.duration) * 100;
      return `${percentage}%`;
    }
    return '0%';
  };
  // console.log('state', state);
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

  const progressWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (progress.duration > 0) {
      const percentage = (progress.position / progress.duration) * 100;

      // Animate the width of the progress bar
      Animated.timing(progressWidth, {
        toValue: percentage, // Final width percentage
        duration: 200, // Duration of animation
        useNativeDriver: false, // Width animation requires native driver to be false
      }).start();
    }
  }, [progress]);

  // const progressWidthStyle = progressWidth.interpolate({
  //   inputRange: [0, 100],
  //   outputRange: ['0%', '100%'],
  // });
  return (
    <LinearGradient colors={colors} style={styles.conatiner}>
      <View style={styles.flexRowBetween}>
        <TouchableOpacity onPress={expandPlayer} activeOpacity={1}>
          <View style={styles.flexRow}>
            <Image
              source={currentPlayingTrack?.artwork_uri}
              style={styles.img}
            />
            <View style={{width: '68%'}}>
              <SlidingText
                fontFamily={Fonts.Bold}
                fontSize={fontR(8)}
                text={currentPlayingTrack?.title}
              />
              <CustomText
                fontFamily={Fonts.Medium}
                numberOfLines={1}
                fontSize={fontR(9)}
                style={{opacity: 0.8}}>
                {currentPlayingTrack?.artist?.name}
              </CustomText>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.flexRow}>
          <Icon
            name="broadcast-on-home"
            iconFamily="MaterialICons"
            color="#ccc"
            size={fontR(22)}
          />
          <TouchableOpacity onPress={togglePlayback}>
            <Icon
              name={isPlaying ? 'pause' : 'play-arrow'}
              iconFamily="MaterialICons"
              color="#ccc"
              size={fontR(22)}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.progressContainer}>
        <View style={styles.progressBackground}>
          
          <View style={[styles.progressBar,{width:calculateProgressWith()}]}/>
        </View>

      </View>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  conatiner: {
    // paddingTop: 4,
    height: 60,
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',

    overflow: 'hidden',
    width: '100%',
  },
  img: {
    borderRadius: 5,
    width: 45,
    height: 45,
    resizeMode: 'cover',
  },
  flexRowBetween: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  progressContainer: {
    height: 2,
    width: '100%',
    marginTop: 5,
  },
  progressBackground: {
    height: 3,
    backgroundColor: 'rgb(255,255,255,0.3',
  },
  progressBar: {
    height: 3,
    backgroundColor: '#fff',
  },
});
export default AirPlayer;
