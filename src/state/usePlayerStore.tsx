import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

import {trackData} from '../utils/dummyData';
import TrackPlayer, {RepeatMode} from 'react-native-track-player';
import {convertTrack} from '../utils/Constants';
import {zustandStorage} from './storage';

interface Track {
  id: any;
  track_uri: string;
  video_uri?: string;
  title: string;
  lyricist: string;
  artist: any;
  artwork_uri: any;
  category: string;
}

interface PlayerStore {
  currentPlayingTrack: Track | null;
  allTrack: Track[];
  isSuffling: boolean;
  isRepeating: boolean;
  clear: () => void;
  setCurrentPlayingTrack: (track: Track) => Promise<void>;
  setCurrentTrack: (track: Track) => Promise<void>;
  play: () => Promise<void>;
  pause: () => Promise<void>;
  next: () => Promise<void>;
  resume: () => Promise<void>;
  previous: () => Promise<void>;
  toggleSuffle: () => void;
  toggleRepeat: () => void;
}

export const usePlayerStore = create<PlayerStore>()(
  persist(
    (set, get) => ({
      currentPlayingTrack: null,
      allTrack: trackData,
      isRepeating: false,
      isSuffling: false,

      clear: () => {
        set({currentPlayingTrack: null});
      },

      setCurrentTrack: async (track: Track) => {
        set({currentPlayingTrack: track});
      },

      setCurrentPlayingTrack: async (track: Track) => {
        const {allTrack} = get();
        // console.log('activeTrack',track)
        await TrackPlayer.reset();

        set({currentPlayingTrack: track});
      
        const currentTrackConverted = convertTrack(track);

        const otherTracks = allTrack
          .filter(t => t.id !== track.id)
          .map(t => convertTrack(t));
        await TrackPlayer.add([currentTrackConverted, ...otherTracks]);

        await TrackPlayer.play();
      },

      play: async () => {
        const {currentPlayingTrack, allTrack} = get();
        const activeTrack = await TrackPlayer.getCurrentTrack();
        if (activeTrack) {
          await TrackPlayer.play();
        } else {
          await TrackPlayer.reset();
          const currentTrackConverted = convertTrack(currentPlayingTrack);
          const otherTracks = allTrack
            .filter(t => t.id !== currentPlayingTrack?.id)
            .map(t => convertTrack(t));
          await TrackPlayer.add([currentTrackConverted, ...otherTracks]);
          await TrackPlayer.play();
        }
      },

      pause: async () => {
        await TrackPlayer.pause();
      },
      resume: async () => {
        const state: any = await TrackPlayer.getState();
        console.log(state, 'state'); // Get the current state of the player
        if (state === 'paused') {
          // Resume playback only if paused
          await TrackPlayer.play();
        }
      },

      next: async () => {
        const {currentPlayingTrack, allTrack, isRepeating} = get();
        await TrackPlayer.reset();
        if (isRepeating) {
          await TrackPlayer.add([convertTrack(currentPlayingTrack)]);
          await TrackPlayer.play();
          return;
        }
        const currentIndex = allTrack.findIndex(
          t => t.id === currentPlayingTrack?.id,
        );
        const nextIndex = (currentIndex + 1) % allTrack.length;
        const nextTrack = allTrack[nextIndex];
        if (nextTrack) {
          set({currentPlayingTrack: nextTrack});
          const otherTracks = allTrack
            .filter(t => t.id !== nextTrack.id)
            .map(t => convertTrack(t));
          await TrackPlayer.add([convertTrack(nextTrack), ...otherTracks]);
          await TrackPlayer.play();
        }
      },

      previous: async () => {
        const {currentPlayingTrack, allTrack, isRepeating} = get();
        await TrackPlayer.reset();
        if (isRepeating) {
          await TrackPlayer.add([convertTrack(currentPlayingTrack)]);
          await TrackPlayer.play();
          return;
        }
        const currentIndex = allTrack.findIndex(
          t => t.id === currentPlayingTrack?.id,
        );
        const prevIndex =
          (currentIndex - 1 + allTrack.length) % allTrack.length;
        const prevTrack = allTrack[prevIndex];
        if (prevTrack) {
          set({currentPlayingTrack: prevTrack});
          const otherTracks = allTrack
            .filter(t => t.id !== prevTrack.id)
            .map(t => convertTrack(t));
          await TrackPlayer.add([convertTrack(prevTrack), ...otherTracks]);
          await TrackPlayer.play();
        }
      },

      toggleRepeat: async () => {
        const {currentPlayingTrack} = get();
        await TrackPlayer.reset();
        await TrackPlayer.add([convertTrack(currentPlayingTrack)]);
        await TrackPlayer.setRepeatMode(RepeatMode.Track);
        await TrackPlayer.play();
        set({isRepeating: true});
        set({isSuffling: false});
      },

      toggleSuffle: async () => {
        const {currentPlayingTrack, allTrack} = get();
        await TrackPlayer.reset();
        const otherTracks = allTrack
          .filter(t => t.id !== currentPlayingTrack?.id)
          .map(t => convertTrack(t));
        await TrackPlayer.add([
          convertTrack(currentPlayingTrack),
          ...otherTracks,
        ]);
        await TrackPlayer.setRepeatMode(RepeatMode.Off);
        await TrackPlayer.play();
        set({isRepeating: false});
        set({isSuffling: true});
      },
    }),
    {
      name: 'player-storage',
      storage: createJSONStorage(() => zustandStorage), // Ensure mmkvStorage is properly imported or defined
    },
  ),
);
