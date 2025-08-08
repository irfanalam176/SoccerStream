import { View, Text, ActivityIndicator } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Colors, style } from '../styles/style'
import { useFocusEffect } from '@react-navigation/native'

const BlankPage = ({navigation}) => {
  useFocusEffect(useCallback(()=>{checkRole()},[]))
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
    <View style={style.wrapper}>
      <ActivityIndicator color={Colors.white} size={50} style={{marginVertical:"auto"}}/>
    </View>
  )
}

export default BlankPage