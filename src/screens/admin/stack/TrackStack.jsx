import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Track from '../Track'
import EditTournament from '../EditTournament'
import TrackTournament from '../TrackTournament'
import TrackPlayers from '../TrackPlayers'


const TrackStack = () => {
    const Stack = createNativeStackNavigator()
  return (
   <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName='track'>
    <Stack.Screen name='track' component={Track}/>
    <Stack.Screen name='editTournament' component={EditTournament}/>
    <Stack.Screen name='trackTournament' component={TrackTournament}/>
    <Stack.Screen name='trackPlayers' component={TrackPlayers}/>
   </Stack.Navigator>
  )
}

export default TrackStack