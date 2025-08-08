import {View, Text, ScrollView, ActivityIndicator} from 'react-native';
import React, {useCallback, useState} from 'react';
import {Colors, style} from '../../styles/style';
import Header from '../../components/comman/Header';
import {useFocusEffect} from '@react-navigation/native';
import {url} from '../../constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MatchCard from '../../components/viewers/MatchCard';

const BroadCaster = ({navigation}) => {
  const [matchData, setMatchData] = useState({});

  const [userID, setUserID] = useState('');
  const [liveID, setLiveID] = useState('');
const[isLoading,setIsLoading] = useState(false)
  async function getLiveMatches() {
    try {
      setIsLoading(true)
      const id = await AsyncStorage.getItem('tournamentId');
      const response = await fetch(
        `${url}/broadcaster/getMatches/${JSON.parse(id)}`,
      );
      const result = await response.json();
      if (response.ok) {
        setMatchData(result.response);
      } else {
        setMatchData({});
      }
    } catch (e) {
      console.log('Cannot get live mathces' + e);
    }finally{
      setIsLoading(false)
    }
  }

  async function goLive(id) {
    const response = await fetch(`${url}/broadCaster/setIds/${id}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({userID, liveID}),
    });

    if (response.ok) {
      navigation.navigate('host', {
        userID: userID,
        userName: userID,
        liveID: liveID,
      });
    }
  }

  useFocusEffect(
    useCallback(() => {
      getLiveMatches();

      setUserID(String(Math.floor(Math.random() * 100000)));
      setLiveID(String(Math.floor(Math.random() * 10000)));
    }, []),
  );
  return (
    <ScrollView style={style.wrapper}>
      <Header title={'Broadcaster'} />
{isLoading&&<ActivityIndicator color={Colors.white} size={30}/>}
      <MatchCard
        teamA={{name: matchData.team1_name, image: matchData.team1_image}}
        teamB={{name: matchData.team2_name, image: matchData.team2_image}}
        backgroundColor={Colors.success}
        onPress={() => goLive(matchData.match_id)}
      />
    </ScrollView>
  );
};

export default BroadCaster;
