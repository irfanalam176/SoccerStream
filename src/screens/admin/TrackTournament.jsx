import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import Header from '../../components/comman/Header';
import {useFocusEffect} from '@react-navigation/native';
import {url} from '../../constant';
import {Colors, style} from '../../styles/style';
const TrackTournament = ({navigation, route}) => {
  const {id} = route.params;

  const [matches, setMatches] = useState([]);
  async function getMatches() {
    try {
      const response = await fetch(`${url}/admin/getMatches/${id}`, {
        method: 'GET',
      });
      const result = await response.json();
      
      if(response.ok){
        setMatches(result);
      }else{
        setMatches([])
      }
    } catch (e) {
      console.log('Cannot Get Matches: ' + e);
    }
  }

  useFocusEffect(
    useCallback(() => {
      getMatches();
    }, []),
  );
  return (
    <ScrollView style={style.wrapper}>
      <Header title={'Track Tournament'} />

      {matches.map((item, key) => (
        <TouchableOpacity
          style={[style.trackCard]}
          key={key}
          onPress={() => navigation.navigate('trackPlayers',{matchId:item.match_id})}>
          <Text style={style.smallText}>{item.match_date}</Text>
          <View style={style.spaceBetween}>
            <View>
              <Text style={[style.heading4, {width: 70}]}>
                {item.team_names.team1}
              </Text>
            </View>
            <Text style={style.heading1}>VS</Text>
            <View>
              <Text style={[style.heading4, {width: 70}]}>
                {item.team_names.team2}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default TrackTournament;
