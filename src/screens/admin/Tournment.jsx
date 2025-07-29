import {View, Text, ScrollView, Alert} from 'react-native';
import React, {useState} from 'react';
import {style} from '../../styles/style';
import InputBox from '../../components/comman/InputBox';
import MainBtn from '../../components/comman/MainBtn';
import {url} from '../../constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../components/comman/Header';

const Tournment = ({navigation}) => {
  const [tournmentName, setTournmentName] = useState(null);
  const [venue, setVenue] = useState(null);

  const createTournment = async () => {
    if (!tournmentName || !venue) {
      Alert.alert('Invalide Data', 'Please Fill all the fields');
      return;
    }
    try {
      const adminId = await AsyncStorage.getItem('adminId');
      if(adminId==null){
          Alert.alert('Error', 'Cannot Create Tournment');
        return
      }
      const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({tournmentName, venue}),
      };
      const response = await fetch(
        `${url}/admin/createTournment/${JSON.parse(adminId)}`,
        options,
      );
      const result = await response.json();
      
      await AsyncStorage.setItem(
        'tournamentId',
        JSON.stringify(result.tournament.id),
      );

      if (response.ok) {
        Alert.alert('Success', 'Tournment Created Successfully');
        navigation.navigate('dashboard');
        return;
      }
      Alert.alert('Error', result.message);
    } catch (e) {
      console.log('Cannot create Tournment : ' + e);
      Alert.alert('Error', 'Cannot Create Tournment');
    }
  };

  return (
    <ScrollView style={style.wrapper}>
      <Header title={'Tournament'} />
      <InputBox
        label={'Tournment Name'}
        onChangeText={e => setTournmentName(e)}
      />
      <InputBox label={'Venue'} onChangeText={e => setVenue(e)} />

      <MainBtn onPress={createTournment} text={'Create'} />
    </ScrollView>
  );
};

export default Tournment;
