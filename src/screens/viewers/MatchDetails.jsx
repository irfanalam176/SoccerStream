import {View, Text, ScrollView} from 'react-native';
import React, {useCallback, useState} from 'react';
import {Colors, style} from '../../styles/style';
import Header from '../../components/comman/Header';
import MatchScoreCard from '../../components/viewers/MatchScoreCard';
import {TopTabs} from '../../components/viewers/TopTabs';
import {useFocusEffect} from '@react-navigation/native';
import {io} from 'socket.io-client';
import Feather from 'react-native-vector-icons/Feather';
const socket = io('http://192.168.87.73:4000', {
  autoConnect: false,
});

const MatchDetails = ({navigation, route}) => {
  const [cardedPlayers, setCardedPlayers] = useState([]);
  const {color, matchId, team1, team2,liveID} = route.params;
  const [liveScore, setLiveScore] = useState({});
  const [penalties, setPenalties] = useState({teamA: [], teamB: []});

  useFocusEffect(
    useCallback(() => {
      socket.connect();

      socket.emit('join-match', matchId);
      socket.emit('get-score', matchId);

      socket.on('score-data', data => {
        const normalizedScore = {
          team_A_score: data.team_A_score ?? data.teamAScore ?? 0,
          team_B_score: data.team_B_score ?? data.teamBScore ?? 0,
        };
        setLiveScore(normalizedScore);
      });

      socket.on('carded-data', carded => {
        setCardedPlayers(carded); // This is an array of strings like "teamA:I. Alam"
      });

      socket.emit('get-penalties', matchId);

      socket.on('penalties-data', data => {
        console.log(data);
        
        setPenalties(data);
      });

      return () => {
        socket.off('score-data');
        socket.off('carded-data');
        socket.disconnect();
      };
    }, [matchId]),
  );

  return (
    <ScrollView style={style.wrapper}>
      <Header title={'Match Details'} />
      <MatchScoreCard
        color={color}
        team1={team1}
        team2={team2}
        liveID={liveID}
        score={liveScore}
      />
      <Text style={{color: Colors.white}}>Penalties:</Text>
      <View
        style={[style.spaceBetween, style.p3, {backgroundColor: Colors.black}]}>
        <View style={style.penality}>
          {penalties?.teamA?.map((p, index) => (
            <Feather
              key={index}
              name={p === 1 ? 'check-circle' : 'x-circle'}
              size={20}
              color={p === 1 ? 'green' : 'red'}
            />
          ))}
        </View>
        <View style={style.penality}>
          {penalties?.teamB?.map((p, index) => (
            <Feather
              key={index}
              name={p === 1 ? 'check-circle' : 'x-circle'}
              size={20}
              color={p === 1 ? 'green' : 'red'}
            />
          ))}
        </View>
      </View>

      <View style={[style.mt3, style.mb3]}>
        <Text style={{color: Colors.white}}>Red Carded Players:</Text>
        {cardedPlayers.map((item, index) => (
          <Text key={index} style={{color: Colors.white}}>
            {item}
          </Text>
        ))}
      </View>

      <TopTabs route={{params: matchId}} />
    </ScrollView>
  );
};

export default MatchDetails;
