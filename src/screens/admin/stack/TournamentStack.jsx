import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Tournment from '../Tournment'
import TeamCreation from '../TeamCreation'
import MatchCreation from '../MatchCreation'
import Dashboard from '../Dashboard'
import Teams from '../Teams'
import EditTeam from '../EditTeam'
import TeamInspect from '../TeamInspect'
import EditPlayer from '../EditPlayer'
import matchesInspect from '../matchesInspect'
import EditMatch from '../EditMatch'

const TournamentStack = () => {
    const Stack = createNativeStackNavigator()
  return (
   <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName='dashboardPage'>
    <Stack.Screen name='dashboardPage' component={Dashboard}/>
    <Stack.Screen name='tournament' component={Tournment}/>
    <Stack.Screen name='team' component={TeamCreation}/>
    <Stack.Screen name='match' component={MatchCreation}/>
    <Stack.Screen name='teamList' component={Teams}/>
    <Stack.Screen name='editTeam' component={EditTeam}/>
    <Stack.Screen name='teamInspect' component={TeamInspect}/>
    <Stack.Screen name='editPlayer' component={EditPlayer}/>
    <Stack.Screen name='matchInspect' component={matchesInspect}/>
    <Stack.Screen name='editMatch' component={EditMatch}/>
   </Stack.Navigator>
  )
}

export default TournamentStack