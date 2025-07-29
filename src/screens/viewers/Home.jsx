import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useCallback, useState} from 'react';
import {Colors, style} from '../../styles/style';
import MatchCard from '../../components/viewers/MatchCard';
import UpcomingMatchCard from '../../components/viewers/UpcomingMatchCard';
import {url} from '../../constant';
import {useFocusEffect} from '@react-navigation/native';

const Home = ({navigation}) => {
  const [liveMatches, setLiveMatches] = useState([]);

  const cardColors = [Colors.success, Colors.black, Colors.danger];

  async function getLiveMatches() {
    try {
      const response = await fetch(`${url}/viewer/getLiveMatches`, {
        method: 'GET',
      });
      const result = await response.json();
      setLiveMatches(result);
    } catch (e) {
      console.log('Cannot get live matches');
    } finally {
    }
  }

  useFocusEffect(
    useCallback(() => {
      getLiveMatches();
    }, []),
  );

  return (
    <ScrollView style={style.wrapper}>
      <Text style={style.heading1}>Home</Text>

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
                    team1:item.team1,
                    team2:item.team2
                  })
                }
              />
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={style.spaceBetween}>
        <Text style={[style.heading2]}>Upcoming Matches</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('allUpcomingMatches')}>
          <Text style={style.links}>See All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={style.cardsContainer}>
        <UpcomingMatchCard
          onPress={() => navigation.navigate('viewUpcomingMatch')}
        />
        <UpcomingMatchCard
          onPress={() => navigation.navigate('viewUpcomingMatch')}
        />
        <UpcomingMatchCard
          onPress={() => navigation.navigate('viewUpcomingMatch')}
        />
        <UpcomingMatchCard
          onPress={() => navigation.navigate('viewUpcomingMatch')}
        />
        <UpcomingMatchCard
          onPress={() => navigation.navigate('viewUpcomingMatch')}
        />
        <View style={style.blankPadding} />
      </ScrollView>
    </ScrollView>
  );
};

export default Home;
