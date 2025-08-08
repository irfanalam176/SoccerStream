import {View, Text, ScrollView} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Colors, style} from '../../styles/style';
import Header from '../../components/comman/Header';
import MainBtn from '../../components/comman/MainBtn';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { url } from '../../constant';

const Dashboard = ({navigation}) => {
  const [disabled, setDisabled] = useState(true);

  async function getTournament() {
    try {
      const adminId = await AsyncStorage.getItem('adminId');
      const response = await fetch(`${url}/admin/isOngoing/${JSON.parse(adminId)}`,{method:"GET"})
      if (response.ok) {
        setDisabled(false);
        return
      }
      setDisabled(true)
    } catch (e) {
      console.log('Cannot Get Tournament information' + e);
    }
  }

  useFocusEffect(
    useCallback(() => {
      getTournament();
    }, []),
  );
  return (
    <ScrollView style={style.wrapper}>
      <Header title={'Dashboard'} back={false}/>


     <View style={{marginTop:"40%"}}>
       <MainBtn
        text={'Create Tounnament'}
        onPress={() => navigation.navigate('tournament')}
      />
      <MainBtn
        text={'Create Teams'}
        style={{marginVertical: 10}}
        onPress={() => navigation.navigate('team')}
        disabled={disabled}
      />
      <MainBtn
        text={'Create Matches'}
        onPress={() => navigation.navigate('match')}
        disabled={disabled}
      />
     <View style={style.spaceBetween}>
       <MainBtn
        text={'List Teams'}
        style={{marginVertical: 10,width:"45%",backgroundColor:Colors.blue}}
        onPress={() => navigation.navigate('teamList')}
        disabled={disabled}
      />
      <MainBtn
      style={{width:"45%",backgroundColor:Colors.blue}}
        text={'List Matches'}
        onPress={() => navigation.navigate('matchInspect')}
        disabled={disabled}
      />
     </View>
     </View>
    </ScrollView>
  );
};

export default Dashboard;
