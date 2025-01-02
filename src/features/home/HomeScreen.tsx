import {View, Text} from 'react-native';
import React from 'react';
import CustomSafeAreaView from '../../components/ui/CustomSafeAreaView';
import withPlayer from '../../components/player/Player';
import {usePlayerStore} from '../../state/usePlayerStore';
import CustomHeader from '../../components/ui/CustomHeader';
import {FlatList} from 'react-native-gesture-handler';
import TrackItem from '../../components/tracks/TrackItem';

const HomeScreen = () => {
  const {allTrack} = usePlayerStore();
  // console.log('allTrack', allTrack)

  const renderMusicalTrack = ({item}:any) => {
    return <TrackItem item={item} onNavigate={true} />;
  };
  return (
    <CustomSafeAreaView>
      <CustomHeader title="Your Tracks" />
      <FlatList
        data={allTrack}
        renderItem={renderMusicalTrack}
        keyExtractor={(item: any) => item.id}
        showsVerticalScrollIndicator={false}
        style={{paddingTop: 20}}
      />
    </CustomSafeAreaView>
  );
};

export default withPlayer(HomeScreen);
