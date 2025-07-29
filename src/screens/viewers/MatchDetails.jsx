import { View, Text, ScrollView } from 'react-native'
import React, { useCallback, useState } from 'react'
import { style } from '../../styles/style'
import Header from '../../components/comman/Header'
import MatchScoreCard from '../../components/viewers/MatchScoreCard'
import { TopTabs } from '../../components/viewers/TopTabs'
import { useFocusEffect } from '@react-navigation/native'
import { url } from '../../constant'

const MatchDetails = ({navigation,route}) => {
    const{color,matchId,team1,team2} = route.params
     const[liveScore,setLiveScore] = useState({})

    async function getLiveMatche(){
      try{
        
        const response = await fetch(`${url}/viewer/getLiveMatche/${matchId}`,{method:"GET"})
        const result  = await response.json()

        if(response.ok){
          setLiveScore(result.result)
        }else{
          setLiveScore({})
        }
        
      }catch(e){
        console.log("Cannot get live matches");
      }finally{
    
      }
      
    }
    
      useFocusEffect(useCallback(()=>{
        getLiveMatche()

      },[]))


  return (
    <ScrollView style={style.wrapper}>
        <Header title={"Match Details"}/>
        <MatchScoreCard color={color} team1={team1} team2={team2} matchId={matchId} score={liveScore}/>

        <TopTabs route={{params:matchId}}/>
    </ScrollView>
  )
}

export default MatchDetails