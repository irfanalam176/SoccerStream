import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import React, {useCallback, useState} from 'react';
import {Colors, style} from '../../../styles/style';
import {useFocusEffect} from '@react-navigation/native';
import {url} from '../../../constant';

const TeamPlayersTab = ({navigation, route}) => {
  const {matchId} = route.params;

  const [teams, setTeams] = useState({});

  async function getTeams() {
    try {
      const response = await fetch(`${url}/viewer/getPlayers/${matchId}`, {
        method: 'GET',
      });
      const result = await response.json();

      if (response.ok) {
        setTeams(result);
      } else {
        setTeams({});
      }
    } catch (e) {
      console.log('Cannot get live matches');
    } finally {
    }
  }

  useFocusEffect(
    useCallback(() => {
      getTeams();
    }, []),
  );

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        padding: 7,
        backgroundColor: '#fff',
      }}>
      {/* Team Names */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: 10,
          marginBottom: 10,
        }}>
        <Text style={{fontSize: 12,color:Colors.black, fontWeight: 'bold', width: '45%'}}>
          {teams?.team1?.name}
        </Text>
        <Text style={{fontSize: 12,color:Colors.black, fontWeight: 'bold', width: '45%'}}>
          {teams?.team2?.name}
        </Text>
      </View>

      {/* Team A Player */}
      <View style={style.spaceBetween}>
        <View style={{width: '45%'}}>
          {teams?.team1?.players?.map((item, key) => (
            <TouchableOpacity
              style={[
                style.row,
                style.alignCenter,
                style.gap2,
                style.playerRow,
              ]}
              onPress={() => {
                navigation.navigate('playerProfile', {
                  team: teams?.team1?.name,
                  name: item?.name,
                  position: item?.position,
                  image: item?.image,
                });
              }} key={key}>
              <Image
                source={{uri: `${url}/upload/${item?.image}`}}
                style={{width: 25, height: 25, borderRadius: 20}}
              />
              <Text style={{fontSize: 12, fontWeight: 'bold',color:Colors.darkGray}}>
                {item?.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={style.seperater} />

        {/* Team B Player */}
        <View style={{width: '45%'}}>
          {teams?.team2?.players?.map((item, key) => (
            <TouchableOpacity
              style={[
                style.row,
                style.alignCenter,
                style.gap2,
                style.playerRow,
              ]}
                    onPress={() => {
                navigation.navigate('playerProfile', {
                  team: teams?.team2?.name,
                  name: item?.name,
                  position: item?.position,
                  image: item?.image,
                });
              }}
               key={key}>
              <Image
                source={{uri: `${url}/upload/${item?.image}`}}
                style={{width: 25, height: 25, borderRadius: 20}}
              />
              <Text style={{fontSize: 12, fontWeight: 'bold',color:Colors.darkGray}}>
                {item?.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default TeamPlayersTab;
