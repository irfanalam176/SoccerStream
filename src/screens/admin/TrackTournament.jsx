import {View, Text, ScrollView, TouchableOpacity, Modal, ActivityIndicator} from 'react-native';
import React, {useCallback, useState} from 'react';
import Header from '../../components/comman/Header';
import {useFocusEffect} from '@react-navigation/native';
import {url} from '../../constant';
import {Colors, style} from '../../styles/style';
import {Dropdown} from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainBtn from '../../components/comman/MainBtn'; // Make sure this is correct

const TrackTournament = ({navigation, route}) => {
  const {id} = route.params;

  const [matches, setMatches] = useState([]);
  const [teams, setTeams] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [teamLoading, setTeamLoading] = useState(false);
  async function getMatches() {
    setIsLoading(true);
    try {
      const response = await fetch(`${url}/admin/getMatches/${id}`, {
        method: 'GET',
      });
      const result = await response.json();
      if (response.ok) {
        setMatches(result);
      } else {
        setMatches([]);
      }
    } catch (e) {
      console.log('Cannot Get Matches: ' + e);
    } finally {
      setIsLoading(false);
    }
  }

  async function getTeams() {
    const adminId = await AsyncStorage.getItem('adminId');
    try {
      const response = await fetch(
        `${url}/admin/getTeams/${JSON.parse(adminId)}`,
        {
          method: 'GET',
        },
      );
      const result = await response.json();
      if (response.ok) {
        setTeams(result.response);
      } else {
        setTeams([]);
      }
    } catch (e) {
      console.log('Cannot Get Teams: ' + e);
    }
  }

  async function finish() {
    try {
      setIsLoading(true);
      const response = await fetch(`${url}/admin/finishTournamnet/${id}`, {
        method: 'PUT',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({selectedTeam}),
      });
      if (response.ok) {
        await AsyncStorage.removeItem('tournamentId');
        navigation.goBack();
      }
    } catch (e) {
      console.log('Cannot finish the tournament' + e);
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      getMatches();
      getTeams();
    }, []),
  );

  return (
    <ScrollView style={style.wrapper}>
      <Header title={'Track Tournament'} />
      {isLoading && <ActivityIndicator color={Colors.white} size={30} />}
      <MainBtn
        text="Finish Tournament"
        onPress={() => setShowModal(true)}
        style={{backgroundColor: Colors.blue, marginBottom: 10}}
      />

      {/* Modal */}
      <Modal
        visible={showModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowModal(false)}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View style={style.modalBody}>
            <Text style={[style.heading3, {marginBottom: 10}]}>
              Winner Of The Tournament
            </Text>
            <Dropdown
              style={style.dropdown}
              placeholderStyle={style.placeholderStyle}
              selectedTextStyle={style.selectedTextStyle}
              inputSearchStyle={style.inputSearchStyle}
              data={teams?.map(team => ({
                label: team.name,
                value: team.id,
              }))}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select Team"
              searchPlaceholder="Search..."
              dropdownPosition="top"
              containerStyle={{backgroundColor: Colors.success}}
              itemTextStyle={{color: Colors.black}}
              value={selectedTeam}
              onChange={item => setSelectedTeam(item.value)}
              disable={teamLoading}
            />
            {isLoading&&<ActivityIndicator color={Colors.white} size={30}/>}
            <MainBtn
              text="Finish Tournament"
              onPress={() => finish()}
              style={{marginTop: 20}}
              disabled={isLoading}
            />
            <MainBtn
              text="Cancel"
              style={{
                backgroundColor: Colors.grey,
                width: 100,
                alignSelf: 'flex-end',
                marginTop: 20,
              }}
              onPress={() => setShowModal(false)}
            />
          </View>
        </View>
      </Modal>

      {matches.map((item, key) => (
        <TouchableOpacity
          style={[
            style.trackCard,
            style.mb3,
            {backgroundColor: Colors.success},
          ]}
          key={key}
          onPress={() =>
            navigation.navigate('trackPlayers', {matchId: item.match_id})
          }>
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
