import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors, style } from '../../styles/style'
import { url } from '../../constant'
import { useNavigation } from '@react-navigation/native'

const MatchScoreCard = ({color,team1,team2,score,liveID}) => {
  const navigation = useNavigation()
  return (  
    <View 
    style={[{
      backgroundColor:color,
    },style.card
    ]}

    >

    <TouchableOpacity style={style.liveBtn} onPress={()=>navigation.navigate("watch",{liveID:liveID,userID:String(Math.floor(Math.random() * 100000))})}>
      <Text style={{ color: Colors.white,textAlign:"center" }}>Watch Live</Text>
    </TouchableOpacity>
 
      <View style={[style.centerRow,style.cardContent]}>
        <View style={style.team}>
            <Image source={{uri:`${url}/upload/${team1.image}`}} style={{ width: 40, height: 50,}} />
        <Text style={[style.mt2,style.smallText,{textAlign:"center"}]}>{team1?.name}</Text>
        </View>

        <View>
            <Text style={{ fontSize: 24, color: '#FFF',marginTop:-25 }}>{score?.team_A_score}:{score?.team_B_score}</Text>
        </View>
        <View style={style.team}>
            <Image  source={{uri:`${url}/upload/${team2.image}`}} style={{ width:40, height: 50 }} />
        <Text style={[style.mt2,style.smallText,{textAlign:"center"}]}>{team2?.name}</Text>
        </View>

      </View>
    </View>
      
    
  )
}

export default MatchScoreCard