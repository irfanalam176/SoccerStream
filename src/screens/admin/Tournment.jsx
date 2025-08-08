import {View, Text, ScrollView, Alert, ActivityIndicator} from 'react-native';
import React, {useState} from 'react';
import {style,Colors} from '../../styles/style';
import InputBox from '../../components/comman/InputBox';
import MainBtn from '../../components/comman/MainBtn';
import {url} from '../../constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../components/comman/Header';

const Tournment = ({navigation}) => {
  const [tournmentName, setTournmentName] = useState(null);
  const [venue, setVenue] = useState(null);
const[isLoading,setIsLoading] = useState(false)
  const createTournment = async () => {
    if (!tournmentName || !venue) {
      Alert.alert('Invalide Data', 'Please Fill all the fields');
      return;
    }
    try {
      setIsLoading(true)
      const adminId = await AsyncStorage.getItem('adminId');
      if (adminId == null) {
        Alert.alert(
          'Error',
          'There is a incomplete tournamet cannot create more right now',
        );
        return;
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

      if (response.ok) {
         await AsyncStorage.setItem(
          'tournamentId',
          JSON.stringify(result.tournament.id),
        );
        
        Alert.alert('Success', 'Tournment Created Successfully');
        navigation.navigate('dashboard');
        return;
      }
      Alert.alert('Error', result.message);
    } catch (e) {
      console.log('Cannot create Tournment : ' + e);
      Alert.alert(
        'Error',
        'There is a incomplete tournamet cannot create more right now',
      );
    }finally{
      setIsLoading(false)
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
      {isLoading&&<ActivityIndicator color={Colors.white} size={30}/>}
      <MainBtn onPress={createTournment} text={'Create'} disabled={isLoading}/>
    </ScrollView>
  );
};

export default Tournment;
