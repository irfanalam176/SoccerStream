import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BroadCaster from './BroadCaster'
import BroadCasterLogin from './BroadCasterLogin'
import HostPage from './HostPage'

const BroadcasterStack = () => {
    const Stack = createNativeStackNavigator()
  return (
   <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name='broadcasterLogin' component={BroadCasterLogin}/>
        <Stack.Screen name='broadcaster' component={BroadCaster}/>
        <Stack.Screen name='host' component={HostPage}/>
   </Stack.Navigator>
  )
}

export default BroadcasterStack