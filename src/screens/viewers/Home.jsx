import {View, Text, ScrollView, TouchableOpacity, ActivityIndicator} from 'react-native';
import React, {useCallback, useState} from 'react';
import {Colors, style} from '../../styles/style';
import MatchCard from '../../components/viewers/MatchCard';
import UpcomingMatchCard from '../../components/viewers/UpcomingMatchCard';
import {url} from '../../constant';
import {useFocusEffect} from '@react-navigation/native';

const Home = ({navigation}) => {
  const [liveMatches, setLiveMatches] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  const cardColors = [Colors.success, Colors.black, Colors.danger];

  async function getLiveMatches() {
    setIsloading(true)
    try {
      const response = await fetch(`${url}/viewer/getLiveMatches`, {
        method: 'GET',
      });
      const result = await response.json();
      if (response.ok) {
        setLiveMatches(result);
      } else {
        setLiveMatches([]);
      }
    } catch (e) {
      console.log('Cannot get live matches');
    } finally {
      setIsloading(false)
    }
  }

  async function getTournaments() {
    try {
      const response = await fetch(`${url}/viewer/getTournaments`, {
        method: 'GET',
      });
      const result = await response.json();

      if (response.ok) {
        setTournaments(result);
      } else {
        setTournaments([]);
      }
    } catch (e) {
      console.log('Cannot get live matches');
    } finally {
    }
  }

  useFocusEffect(
    useCallback(() => {
      getLiveMatches();
      getTournaments();
    }, []),
  );

  return (
    <ScrollView style={style.wrapper}>
      <Text style={style.heading1}>Home</Text>
    {isLoading&&<ActivityIndicator color={Colors.white} size={30}/>}
      <View>
        <View style={style.spaceBetween}>
          <Text style={[style.heading2]}>Live Matches</Text>
          <TouchableOpacity onPress={() => navigation.navigate('allLive')}>
            <Text style={style.links}>See All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={[style.spaceBetween, style.gap3]}>
            {liveMatches.map((item, key) => (
              <MatchCard
                key={key}
                leagueName={item.tournament.name}
                teamA={item.team1}
                Score={item.score}
                teamB={item.team2}
                backgroundColor={cardColors[key]}
                onPress={() =>
                  navigation.navigate('matchDetails', {
                    color: cardColors[key],
                    matchId: item.id,
                    team1: item.team1,
                    team2: item.team2,
                    liveID: item.liveID,
                  })
                }
              />
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={style.spaceBetween}>
        <Text style={[style.heading2]}>All Matches in the tournament</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('allUpcomingMatches')}>
          <Text style={style.links}>See All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={style.cardsContainer}>
        {tournaments?.map((item, key) => (
          <TouchableOpacity
            style={style.upcommingMatcheCard}
            key={key}
            onPress={() =>
              navigation.navigate('viewTournament', {id: item.id})
            }>
            <Text style={style.heading3}>Tournament</Text>
            <Text style={style.heading3}>{item.name}</Text>
            <Text style={style.heading4}>{item.location}</Text>
          </TouchableOpacity>
        ))}
        <View style={style.blankPadding} />
      </ScrollView>
    </ScrollView>
  );
};

export default Home;
