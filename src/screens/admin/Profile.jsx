import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { style } from '../../styles/style'
import MainBtn from '../../components/comman/MainBtn'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Profile = ({navigation}) => {

  async function logOut(){
    const adminId = await AsyncStorage.removeItem("adminId")
    if(adminId == undefined){
      navigation.navigate("role")
    }
  }

  return (
    <ScrollView style={style.wrapper}>
      <MainBtn text={"Logout"} onPress={logOut}/>
    </ScrollView>
  )
}

export default Profile