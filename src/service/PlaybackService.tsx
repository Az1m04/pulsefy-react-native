import TrackPlayer, {Capability, Event} from 'react-native-track-player';
import {usePlayerStore} from '../state/usePlayerStore';

export const PlaybackService = async () => {
  TrackPlayer.addEventListener(Event.RemotePlay, () => {
    TrackPlayer.play();
  });
  TrackPlayer.addEventListener(Event.RemotePause, () => {
    TrackPlayer.pause();
  });
  TrackPlayer.addEventListener(Event.RemoteStop, () => {
    TrackPlayer.stop();
    usePlayerStore.getState().clear();
  });
  TrackPlayer.addEventListener(Event.RemoteNext, async () => {
    await usePlayerStore.getState().next();
  });
  TrackPlayer.addEventListener(Event.RemotePrevious, async () => {
    await usePlayerStore.getState().previous();
  });

  TrackPlayer.addEventListener(Event.PlaybackActiveTrackChanged, async e => {
    const currentTrack = usePlayerStore.getState().currentPlayingTrack;
    if (e?.track?.id == undefined || currentTrack?.id === e?.track?.id) {
      return;
    }
    const allTrack = usePlayerStore.getState().allTrack;
    const track = allTrack.find(item => item.id == e?.track?.id) as any;
    usePlayerStore?.getState().setCurrentPlayingTrack(track);
  });
  await TrackPlayer.setupPlayer();
  await TrackPlayer.updateOptions({
    capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
      Capability.Stop,
    ],
    compactCapabilities: [Capability.Play, Capability.Pause],
  });
};
