import {ScrollView, Alert,ActivityIndicator} from 'react-native';
import React, {useCallback, useState} from 'react';
import {style,Colors} from '../../styles/style';
import InputBox from '../../components/comman/InputBox';
import MainBtn from '../../components/comman/MainBtn';
import {url} from '../../constant';
import Header from '../../components/comman/Header';
import { useFocusEffect } from '@react-navigation/native';

const EditTournament = ({navigation,route}) => {
    const id = route.params.id
  const [tournmentName, setTournmentName] = useState(null);
  const [venue, setVenue] = useState(null);
const[isLoading,setIsLoading] = useState(false)
  const updateTournment = async () => {
    if (!tournmentName || !venue) {
      Alert.alert('Invalide Data', 'Please Fill all the fields');
      return;
    }
    try {
      setIsLoading(true)
      const options = {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({tournmentName, venue}),
      };
      const response = await fetch(
        `${url}/admin/updateTournment/${id}`,
        options,
      );

      if (response.ok) {
        Alert.alert('Success', 'Tournment Updated Successfully');
        navigation.goBack();
        return;
      }
      Alert.alert('Error', 'Cannot Update Tournment');
    } catch (e) {
      console.log('Cannot Update Tournment : ' + e);
      Alert.alert('Error', 'Cannot Update Tournment');
    }finally{
      setIsLoading(false)
    }
  };


  async function getDate(){
    try{
        const response = await fetch(`${url}/admin/getTournamentById/${id}`)
        const result = await response.json()
        setTournmentName(result.response.name)
        setVenue(result.response.location)
        
    }catch(e){
        console.log("Cannot get Tournamnet data : "+e);
        
    }
  }
  useFocusEffect(useCallback(()=>{
    getDate()
  },[]))
  return (
    <ScrollView style={style.wrapper}>
      <Header title={'Edit Tournament'} />
      <InputBox
        label={'Tournment Name'}
        onChangeText={e => setTournmentName(e)}
        value={tournmentName}
      />
      <InputBox label={'Venue'} onChangeText={e => setVenue(e)} value={venue}/>
{isLoading&&<ActivityIndicator color={Colors.white} size={30}/>}
      <MainBtn onPress={updateTournment} text={'Create'} disabled={isLoading}/>
    </ScrollView>
  );
};

export default EditTournament;
