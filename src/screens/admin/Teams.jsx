import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import Header from '../../components/comman/Header';
import {Colors, style} from '../../styles/style';
import {useFocusEffect} from '@react-navigation/native';
import {url} from '../../constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainBtn from '../../components/comman/MainBtn';

const Teams = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);

  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [teamLoading, setTeamLoading] = useState(false);
  async function getTeams() {
    try {
      setTeamLoading(true);
      const id = await AsyncStorage.getItem('adminId');
      const response = await fetch(`${url}/admin/getTeams/${JSON.parse(id)}`);
      const result = await response.json();
      if (response.ok) {
        setTeams(result.response);
      } else {
        setTeams([]);
      }
    } catch (e) {
      console.log('Server error' + e);
    } finally {
      setTeamLoading(false);
    }
  }

  async function deleteTeam() {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${url}/admin/deleteTeam/${selectedTeam.id}`,
        {method: 'DELETE'},
      );
      if (response.ok) {
        getTeams();
      }
    } catch (e) {
      Alert.alert('Error', 'Server Error');
    } finally {
      setIsLoading(false);
      setModalVisible(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      getTeams();
    }, []),
  );
  return (
    <ScrollView style={style.wrapper}>
      <Header title={'Teams'} />
      {teamLoading && <ActivityIndicator color={Colors.white} size={30} />}
      <ScrollView contentContainerStyle={style.table} horizontal={true}>
        <View style={style.tData}>
          <View style={style.tHead}>
            <View style={style.th}>
              <Text style={style.thText}>#SNO</Text>
            </View>
            <View style={style.th}>
              <Text style={style.thText}>Img</Text>
            </View>
            <View style={style.th}>
              <Text style={style.thText}>name</Text>
            </View>
          </View>

          {teams?.map((item, key) => (
            <TouchableOpacity
              style={style.tRow}
              key={key}
              onPress={() => {
                setSelectedTeam(item);
                setModalVisible(true);
              }}>
              <View style={style.td}>
                <Text style={style.tdText}>{key + 1}</Text>
              </View>
              <View style={style.td}>
                <Image
                  source={{uri: `${url}/upload/${item?.image}`}}
                  style={style.tableImage}
                />
              </View>
              <View style={style.td}>
                <Text style={style.tdText}>{item?.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

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
            <Text style={style.heading3}>Team {selectedTeam?.name}</Text>
            <Text style={[style.heading4, {marginVertical: 10}]}>
              Do you Want To Edit Delete or Inspect?
            </Text>
            {isLoading && <ActivityIndicator color={Colors.white} size={30} />}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                gap: 5,
              }}>
              <MainBtn
                text="Delete"
                style={{flex: 1, backgroundColor: Colors.danger}}
                onPress={deleteTeam}
                disabled={isLoading}
              />
              <MainBtn
                text="Edit"
                style={{flex: 1, backgroundColor: Colors.blue}}
                onPress={() => {
                  navigation.navigate('editTeam', {team: selectedTeam});
                  setModalVisible(false);
                }}
                disabled={isLoading}
              />
              <MainBtn
                text="Inspect"
                style={{flex: 1, backgroundColor: Colors.success}}
                onPress={() => {
                  navigation.navigate('teamInspect', {teamId: selectedTeam.id});
                  setModalVisible(false);
                }}
                disabled={isLoading}
              />
            </View>
            <MainBtn
              text="Cancel"
              style={{
                backgroundColor: Colors.grey,
                width: 'auto',
                marginLeft: 'auto',
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

export default Teams;
