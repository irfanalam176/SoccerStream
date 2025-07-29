import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import {Colors, style} from '../../styles/style';
import Header from '../../components/comman/Header';
import {url} from '../../constant';
import {useState, useCallback} from 'react';
import MainBtn from '../../components/comman/MainBtn';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const matchesInspect = ({navigation}) => {
  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  async function getMatches() {
    const id = await AsyncStorage.getItem('tournamentId');
    try {
      const response = await fetch(
        `${url}/admin/getMatches/${JSON.parse(id)}`,
        {
          method: 'GET',
        },
      );
      const result = await response.json();
      if (response.ok) {
        setMatches(result);
      }else{
        setMatches([])
      }
    } catch (e) {
      console.log('Cannot Get Matches: ' + e);
    }
  }

  async function deleteMatch() {
    
   try{
     const response = await fetch(`${url}/admin/deleteMatch/${selectedMatch.match_id}`,{method:"DELETE"})
    if(response.ok){
        getMatches()
        Alert.alert("Delete","Match Deleted Successfully")
    }
   }catch(e){
    Alert.alert("Error","Server Error")
   }finally{
    setModalVisible(false)
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

      {/* 🔵 Player Table */}   
      <ScrollView contentContainerStyle={style.table} horizontal={true}>
        <View style={[style.tData, {width: 600}]}>
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
            <Text style={style.heading3}>Player {selectedMatch?.name}</Text>
            <Text style={[style.heading4, {marginVertical: 10}]}>
              Do You Want to Edit or Delete this Player ?
            </Text>

            <View style={[style.spaceBetween, style.gap3]}>
              <MainBtn
                text="Delete"
                style={{flex: 1, backgroundColor: Colors.danger}}
                onPress={deleteMatch}
              />
              <MainBtn
                text="Edit"
                style={{flex: 1, backgroundColor: Colors.blue}}
                onPress={() => {
                  navigation.navigate('editMatch', {
                    id: selectedMatch.match_id,
                    teams:selectedMatch.team_names,
                    date: selectedMatch.match_date,
                    time: selectedMatch.match_time,
                    round: selectedMatch.match_round,
                  });
                  setModalVisible(false);
                }}
              />
              <MainBtn
                text="Cancel"
                style={{flex: 1, backgroundColor: Colors.grey}}
                onPress={() => setModalVisible(false)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};
export default matchesInspect;
