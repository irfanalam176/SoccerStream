import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../Home'
import AllLiveMatches from '../AllLiveMatches'

const ViewerLayout = () => {
    const Stack = createNativeStackNavigator()
  return (
   <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName='home'>
     <Stack.Screen name='home' component={Home}/>
    <Stack.Screen name='allLive' component={AllLiveMatches}/>
   </Stack.Navigator>
  )
}

export default ViewerLayout