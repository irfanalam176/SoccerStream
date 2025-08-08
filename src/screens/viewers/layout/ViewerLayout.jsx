import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../Home'
import AllLiveMatches from '../AllLiveMatches'
import AllUpComingMatches from '../AllUpComingMatches'
import PlayerProfile from '../PlayerProfile'
import MatchDetails from '../MatchDetails'
import AudiencePage from '../AudiencePage'
import ViewTournament from '../ViewTournament'

const ViewerLayout = () => {
    const Stack = createNativeStackNavigator()
  return (
   <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName='home'>
     <Stack.Screen name='home' component={Home}/>
    <Stack.Screen name='allLive' component={AllLiveMatches}/>
    <Stack.Screen name='viewTournament' component={ViewTournament}/>
    <Stack.Screen name='allUpcomingMatches' component={AllUpComingMatches}/>
    <Stack.Screen name='playerProfile' component={PlayerProfile}/>
    <Stack.Screen name='matchDetails' component={MatchDetails}/>
    <Stack.Screen name='watch' component={AudiencePage}/>
   </Stack.Navigator>
  )
}

export default ViewerLayout