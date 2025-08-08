import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {Colors, style} from '../../styles/style';
import Header from '../../components/comman/Header';
import SearchBox from '../../components/comman/SearchBox';
import {useFocusEffect} from '@react-navigation/native';
import {url} from '../../constant';

const AllUpComingMatches = ({navigation}) => {
  const [tournaments, setTournaments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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
    }
  }

  useFocusEffect(
    useCallback(() => {
      getTournaments();
    }, []),
  );

  const filteredTournaments = tournaments.filter(item => {
    const name = item.name?.toLowerCase() || '';
    const location = item.location?.toLowerCase() || '';
    const term = searchTerm.toLowerCase();
    return name.includes(term) || location.includes(term);
  });

  return (
    <View style={style.wrapper}>
      <Header title={'Upcoming Matches'} />

      <View style={{marginVertical: 10, marginHorizontal: 15}}>
        <TextInput
          placeholder="Search by team name or venue..."
          placeholderTextColor={Colors.gray}
          value={searchTerm}
          onChangeText={setSearchTerm}
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

      <ScrollView style={style.cardsContainer}>
        {filteredTournaments.length > 0 ? (
          filteredTournaments.map((item, key) => (
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
          ))
        ) : (
          <Text style={{textAlign: 'center', marginTop: 20, color: '#555'}}>
            No tournaments found.
          </Text>
        )}
        <View style={style.blankPadding} />
      </ScrollView>
    </View>
  );
};

export default AllUpComingMatches;
