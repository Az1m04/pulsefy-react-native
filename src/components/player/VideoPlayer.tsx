import {View, Text, StyleSheet} from 'react-native';
import React, {FC} from 'react';
import {screenHeight, screenWidth} from '../../utils/Scaling';
import Video from 'react-native-video';
import LinearGradient from 'react-native-linear-gradient';
const VideoPlayer: FC<{video_uri: any}> = ({video_uri}) => {
  return (
    <View>
      <Video
        source={video_uri}
        ignoreSilentSwitch="ignore"
        playWhenInactive={false}
        playInBackground={false}
        muted
        style={styles.videoContainer}
        disableFocus={true}
        controls={false}
        repeat
        hideShutterView
        resizeMode="cover"
        shutterColor="transparent"
      />
      <LinearGradient
        colors={[
          'rgba(0,0,0,0)',
          'rgba(0,0,0,0.0)',
          'rgba(0,0,0,0.1)',
          'rgba(0,0,0,0.2)',
          'rgba(0,0,0,0.3)',
          'rgba(0,0,0,0.4)',
          'rgba(0,0,0,0.5)',
          'rgba(0,0,0,0.6)',
          'rgba(0,0,0,0.7)',
          'rgba(0,0,0,0.8)',
          'rgba(0,0,0,0.9)',
          'rgba(0,0,0,1)',
        ]}
        style={styles.gradient}
      />

    </View>
  );
};
const styles = StyleSheet.create({
  videoContainer: {
    height: screenHeight,
    aspectRatio: 9 / 16,
    width: screenWidth,
    zIndex: -2,
    position: 'absolute',
  },
  gradient: {
    height: screenHeight,
    width: screenWidth,
    zIndex: -1,
    position: 'absolute',
    bottom: 0,
    top: 0,
  },
});
export default VideoPlayer;
