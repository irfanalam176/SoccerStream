import {
  View,
  ScrollView,
  SafeAreaView,
  TextInput,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {Colors, style} from '../../styles/style';
import MatchCard from '../../components/viewers/MatchCard';
import Header from '../../components/comman/Header';
import {useFocusEffect} from '@react-navigation/native';
import {url} from '../../constant';

const AllLiveMatches = ({navigation}) => {
  const [liveMatches, setLiveMatches] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
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
    }
  }

  useFocusEffect(
    useCallback(() => {
      getLiveMatches();
    }, []),
  );

  const filteredMatches = liveMatches.filter(item => {
    const team1 = item?.team1?.name?.toLowerCase() || '';
    const team2 = item?.team2?.name?.toLowerCase() || '';
    const search = searchQuery.toLowerCase();
    return team1.includes(search) || team2.includes(search);
  });

  return (
    <SafeAreaView>
      <View style={style.wrapper}>
        <Header title={'Live Matches'} />

        <View style={{marginVertical: 10, marginHorizontal: 15}}>
          <TextInput
            placeholder="Search by team name..."
            placeholderTextColor={Colors.gray}
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={{
              borderWidth: 1,
              borderColor: Colors.gray,
              borderRadius: 10,
              paddingHorizontal: 15,
              paddingVertical: 8,
              color: Colors.black,
              backgroundColor: Colors.white,
            }}
          />
        </View>

        <ScrollView
          style={style.cardsContainer}>
          {filteredMatches.slice(0, 3).map((item, key) => (
            <MatchCard
              key={key}
              leagueName={item.tournament.name}
              teamA={item.team1}
              Score={item.score}
              teamB={item.team2}
              backgroundColor={cardColors[key % cardColors.length]}
              onPress={() =>
                navigation.navigate('matchDetails', {
                    color: cardColors[key],
                    matchId: item.id,
                    team1:item.team1,
                    team2:item.team2,
                    liveID:item.liveID
                })
              }
            />
          ))}
          <View style={style.blankPadding} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AllLiveMatches;
