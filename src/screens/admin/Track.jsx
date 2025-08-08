import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {Colors, style} from '../../styles/style';
import Header from '../../components/comman/Header';
import MainBtn from '../../components/comman/MainBtn';
import {url} from '../../constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';

const Track = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [tournamentLoading, setTournamentLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [Tournament, setTournament] = useState([]);

  async function getTournaments() {
    try {
      setTournamentLoading(true);
      const adminId = await AsyncStorage.getItem('adminId');
      const response = await fetch(
        `${url}/admin/getTournaments/${JSON.parse(adminId)}`,
      );
      const result = await response.json();
      console.log(result);

      if (response.ok) {
        setTournament(result);
      } else {
        setTournament([]);
      }
    } catch (e) {
      console.log('Cannot Get Tournaments : ' + e);
    } finally {
      setTournamentLoading(false);
    }
  }

  const deleteTournament = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${url}/admin/deleteTournament/${selectedTournament.id}`,
        {
          method: 'DELETE',
        },
      );
      if (response.ok) {
        // Refresh tournaments
        getTournaments();
      } else {
        console.log('Delete failed');
        Alert.alert('Error', 'Cannot Delete Tournament');
      }
    } catch (error) {
      console.log('Error deleting tournament:', error);
    } finally {
      setIsLoading(false);
      setModalVisible(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getTournaments();
    }, []),
  );

  return (
    <ScrollView style={style.wrapper}>
      <Header title={'Track'} back={false} />
      {tournamentLoading && (
        <ActivityIndicator color={Colors.white} size={30} />
      )}
      {Tournament.map((item, key) => (
        <TouchableOpacity
          style={[
            style.trackCard,
            style.spaceBetween,
            style.mb3,
            {
              backgroundColor:
                item.isCompleted == 1 ? Colors.darkGray : Colors.success,
            },
          ]}
          key={key}
          onPress={() => navigation.navigate('trackTournament', {id: item.id})}
          disabled={item.isCompleted ? true : false}>
          <View>
            <Text style={style.heading3}>Tournament</Text>
            <Text style={style.heading4}>{item.name}</Text>
            <Text style={style.heading4}>{item.location}</Text>
          </View>

          <View>
            <View>
              <MainBtn
                text={'Edit'}
                style={{
                  backgroundColor:
                    item.isCompleted == 1 ? Colors.lightGray : Colors.blue,
                  marginBottom: 5,
                }}
                onPress={() =>
                  navigation.navigate('editTournament', {id: item.id})
                }
                disabled={item.isCompleted ? true : false}
              />
            </View>
            <View>
              <MainBtn
                text={'Delete'}
                style={{backgroundColor: Colors.danger}}
                onPress={() => {
                  setSelectedTournament(item);
                  setModalVisible(true);
                }}
              />
            </View>
          </View>
        </TouchableOpacity>
      ))}

      {/* delete modal */}
      <Modal
        animationType="slide"
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
            <Text style={style.heading3}>Delete Tournament?</Text>
            <Text style={[style.heading4, {marginVertical: 10}]}>
              Are you sure you want to delete {selectedTournament?.name}?
            </Text>
            {isLoading && <ActivityIndicator color={Colors.white} size={30} />}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <MainBtn
                text="Delete"
                style={{flex: 1, backgroundColor: Colors.danger}}
                onPress={deleteTournament}
                disabled={isLoading}
              />
              <MainBtn
                text="Cancel"
                style={{flex: 1, backgroundColor: Colors.grey, marginRight: 10}}
                onPress={() => setModalVisible(false)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Track;
