import { View, Text } from 'react-native'
import React, { useEffect } from 'react'

const BlankPage = ({navigation}) => {
  useEffect(()=>{checkRole()},[])
  async function checkRole(){
    navigation.navigate("viewerLayout")
  }
  return (
    <View>
    </View>
  )
}

export default BlankPage