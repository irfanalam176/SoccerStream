import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../Home'
import AllLiveMatches from '../AllLiveMatches'
import AllUpComingMatches from '../AllUpComingMatches'
import ViewUpcomingMatch from '../ViewUpcomingMatch'
import PlayerProfile from '../PlayerProfile'
import MatchDetails from '../MatchDetails'

const ViewerLayout = () => {
    const Stack = createNativeStackNavigator()
  return (
   <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName='home'>
     <Stack.Screen name='home' component={Home}/>
    <Stack.Screen name='allLive' component={AllLiveMatches}/>
    <Stack.Screen name='allUpcomingMatches' component={AllUpComingMatches}/>
    <Stack.Screen name='viewUpcomingMatch' component={ViewUpcomingMatch}/>
    <Stack.Screen name='playerProfile' component={PlayerProfile}/>
    <Stack.Screen name='matchDetails' component={MatchDetails}/>
   </Stack.Navigator>
  )
}

export default ViewerLayout