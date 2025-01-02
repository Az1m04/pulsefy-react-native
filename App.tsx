import React, {useEffect} from 'react';
import Navigation from './src/navigations/Navigation';
import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {LogBox, Platform} from 'react-native';
import TrackPlayer from 'react-native-track-player';
// LogBox.ignoreAllLogs()
function App(): React.JSX.Element {
  useEffect(() => {
    if (Platform.OS === 'android') {
      TrackPlayer.setupPlayer();
    }
  }, []);
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Navigation />
    </GestureHandlerRootView>
  );
}

export default App;
