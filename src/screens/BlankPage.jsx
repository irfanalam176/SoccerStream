import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const BlankPage = ({navigation}) => {
  useEffect(()=>{checkRole()},[])
  async function checkRole(){

    try{
      const adminId = await AsyncStorage.getItem("adminId")
      if(adminId){
        navigation.navigate("adminStack")
      }else{
        navigation.navigate("adminLogin")
      }
    }catch(e){
      console.log(e);
    }

  }
  return (
    <View>
    </View>
  )
}

export default BlankPage