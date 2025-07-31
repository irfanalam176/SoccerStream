import { View, Text, ScrollView } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { Colors, style } from '../../../styles/style'
import { url } from '../../../constant'
const MatchDetailTab = ({route}) => {
  const{matchId} = route.params

       const[detail,setDetail] = useState({})
  
      async function getLiveMatche(){
        try{
          
          const response = await fetch(`${url}/viewer/getMatchDetails/${matchId}`,{method:"GET"})
          const result  = await response.json()
  
          if(response.ok){
            setDetail(result.result)
          }else{
            setDetail({})
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
    <ScrollView >
      <Text style={{ color: Colors.white }}>Match Details</Text>
   <View style={[style.card, { backgroundColor: Colors.white }]}>
          <View style={[style.spaceBetween,style.pt1,style.pb3,style.border,style.mb3]}>
          <Text style={{fontWeight:"700",color:Colors.black}}>Round</Text>
          <Text style={{color:Colors.darkGray}}>{detail.round}</Text>
        </View>  
          <View style={[style.spaceBetween,style.pt1,style.pb3,style.border,style.mb3]}>
          <Text style={{fontWeight:"700",color:Colors.black}}>Date</Text>
          <Text style={{color:Colors.darkGray}}>{detail.match_date}</Text>
        </View>  
          <View style={[style.spaceBetween,style.pt1,style.pb3,style.border,style.mb3]}>
          <Text style={{fontWeight:"700",color:Colors.black}}>Time</Text>
          <Text style={{color:Colors.darkGray}}>{detail.time}</Text>
        </View>  
          <View style={[style.spaceBetween,style.pt1,style.pb3,style.border,style.mb3]}>
          <Text style={{fontWeight:"700",color:Colors.black}}>Venue</Text>
          <Text style={{color:Colors.darkGray}}>{detail.tournament_location}</Text>
        </View>  
          <View style={[style.spaceBetween,style.pt1,style.pb3,style.border,style.mb3]}>
          <Text style={{fontWeight:"700",color:Colors.black}}>League</Text>
          <Text style={{color:Colors.darkGray}}>{detail.tournament_name}</Text>
        </View>   
        </View>  

     
    </ScrollView>
  )
}

export default MatchDetailTab