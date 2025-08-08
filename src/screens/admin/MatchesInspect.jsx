import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {Colors, style} from '../../styles/style';
import Header from '../../components/comman/Header';
import {url} from '../../constant';
import {useState, useCallback} from 'react';
import MainBtn from '../../components/comman/MainBtn';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const  MatchesInspect= ({navigation}) => {
  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [matchLoading, setMatchLoading] = useState(false);
  async function getMatches() {
    const id = await AsyncStorage.getItem('tournamentId');

    try {
      setMatchLoading(true);
      const response = await fetch(
        `${url}/admin/getMatches/${JSON.parse(id)}`,
        {
          method: 'GET',
        },
      );
      const result = await response.json();
      if (response.ok) {
        setMatches(result);
      } else {
        setMatches([]);
      }
    } catch (e) {
      console.log('Cannot Get Matches: ' + e);
    } finally {
      setMatchLoading(false);
    }
  }

  async function deleteMatch() {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${url}/admin/deleteMatch/${selectedMatch.match_id}`,
        {method: 'DELETE'},
      );
      if (response.ok) {
        getMatches();
        Alert.alert('Delete', 'Match Deleted Successfully');
      }
    } catch (e) {
      Alert.alert('Error', 'Server Error');
    } finally {
      setIsLoading(false);
      setModalVisible(false);
    }
  }

  async function startMatch() {
    try {
      const response = await fetch(
        `${url}/admin/startMatch/${selectedMatch.match_id}`,
        {method: 'GET'},
      );
      if (response.ok) {
        navigation.navigate('scoreUpdate', {
          id: selectedMatch.match_id,
        });
        setModalVisible(false);
      }
    } catch (e) {
      console.log('Cannot start match' + e);
    }
  }

  useFocusEffect(
    useCallback(() => {
      getMatches();
    }, []),
  );

  return (
    <ScrollView style={style.wrapper}>
      <Header title={'Track Matches'} />
      {matchLoading && <ActivityIndicator color={Colors.white} size={30} />}
      {/* 🔵 Player Table */}
      <ScrollView contentContainerStyle={style.table} horizontal={true}>
        <View style={[style.tData, {width: 700}]}>
          <View style={style.tHead}>
            <View style={style.th}>
              <Text style={style.thText}>#SNO</Text>
            </View>
            <View style={style.th}>
              <Text style={style.thText}>Team 1</Text>
            </View>
            <View style={style.th}>
              <Text style={style.thText}>Team 2</Text>
            </View>
            <View style={style.th}>
              <Text style={style.thText}>Date</Text>
            </View>
            <View style={style.th}>
              <Text style={style.thText}>Time</Text>
            </View>
            <View style={style.th}>
              <Text style={style.thText}>Round</Text>
            </View>
            <View style={style.th}>
              <Text style={style.thText}>Completed</Text>
            </View>
          </View>

          {matches?.map((item, key) => (
            <TouchableOpacity
              style={style.tRow}
              key={key}
              onPress={() => {
                setSelectedMatch(item);
                setModalVisible(true);
              }}>
              <View style={style.td}>
                <Text style={style.tdText}>{key + 1}</Text>
              </View>
              <View style={style.td}>
                <Text style={style.tdText}>{item.team_names.team1}</Text>
              </View>
              <View style={style.td}>
                <Text style={style.tdText}>{item.team_names.team2}</Text>
              </View>
              <View style={style.td}>
                <Text style={style.tdText}>{item.match_date}</Text>
              </View>
              <View style={style.td}>
                <Text style={style.tdText}>{item.match_time}</Text>
              </View>
              <View style={style.td}>
                <Text style={style.tdText}>{item.match_round}</Text>
              </View>
              <View style={style.td}>
                <Text style={style.tdText}>
                  {item.isCompleted == 0 ? 'NO' : 'YES'}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View style={style.modalBody}>
            <Text style={style.heading3}>Match Action</Text>
            <Text style={[style.heading4, {marginVertical: 10}]}>
              Do You Want to Edit or Delete this Match ?
            </Text>
            {isLoading && <ActivityIndicator color={Colors.white} size={30} />}
            <View style={[style.spaceBetween, style.gap3]}>
              <MainBtn
                text="Delete"
                style={{flex: 1, backgroundColor: Colors.danger}}
                onPress={deleteMatch}
                disabled={isLoading}
              />
              <MainBtn
                text="Edit"
                style={{flex: 1, backgroundColor: Colors.blue}}
                onPress={() => {
                  navigation.navigate('editMatch', {
                    id: selectedMatch.match_id,
                    teams: selectedMatch.team_names,
                    date: selectedMatch.match_date,
                    time: selectedMatch.match_time,
                    round: selectedMatch.match_round,
                  });
                  setModalVisible(false);
                }}
                disabled={isLoading}
              />
              <MainBtn
                text="Start"
                style={{flex: 1, backgroundColor: Colors.success}}
                onPress={() => {
                  if (selectedMatch.isCompleted == 1) {
                    setModalVisible(false);
                    Alert.alert(
                      'Match Completed',
                      'This match is already completed',
                    );
                    return;
                  }
                  startMatch();
                }}
                disabled={isLoading}
              />
            </View>
            <MainBtn
              text="Cancel"
              style={{
                backgroundColor: Colors.grey,
                width: 100,
                alignSelf: 'flex-end',
                marginTop: 20,
              }}
              onPress={() => setModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};
export default MatchesInspect;
