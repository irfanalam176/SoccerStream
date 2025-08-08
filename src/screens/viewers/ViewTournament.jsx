import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useCallback, useState} from 'react';
import {Colors, style} from '../../styles/style';
import Header from '../../components/comman/Header';
import MatchCard from '../../components/viewers/MatchCard';
import {useFocusEffect} from '@react-navigation/native';
import {url} from '../../constant';

const ViewTournament = ({navigation, route}) => {
  const {id} = route.params;
  const [matches, setMatches] = useState([{}]);

  async function getMatches() {
    try {
      const response = await fetch(`${url}/viewer/getMatches/${id}`, {
        method: 'GET',
      });
      const result = await response.json();
      if (response.ok) {
        setMatches(result);
      } else {
        setMatches([]);
      }
    } catch (e) {
      console.log('Cannot get upcoming matches' + e);
    }
  }

  useFocusEffect(
    useCallback(() => {
      getMatches();
    }, []),
  );

  return (
    <ScrollView style={style.wrapper}>
      <Header title={'All Matches in the tournament'} />

      {matches?.map((item, key) => (
        <TouchableOpacity
          key={key}
          style={style.upcommingMatcheCard}
          onPress={() =>
            navigation.navigate('matchDetails', {
              color: Colors.darkGray,
              matchId: item?.match_id,
              team1: item?.team_names?.team1,
              team2: item?.team_names?.team2,
            })
          }>
          <Text style={{color: Colors.white}}>{item?.match_date}</Text>
          <View style={[style.spaceBetween]}>
            <Text style={[style.heading4, {width: 100}]}>
              {item?.team_names?.team1?.name}
            </Text>
            <Text style={style.heading3}>{item?.match_time}</Text>
            <Text style={[style.heading4, {width: 100}]}>
              {item?.team_names?.team2?.name}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default ViewTournament;
