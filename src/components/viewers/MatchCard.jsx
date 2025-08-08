import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors, style } from '../../styles/style'
import { url } from '../../constant'

const MatchCard = ({leagueName,teamA,teamB,backgroundColor,onPress}) => {
  return (  
    <TouchableOpacity 
    style={[{
      backgroundColor:backgroundColor,
    },style.card
    ]}
      onPress={onPress}
    >

    <Text style={{ color: Colors.white, marginBottom: 20 }}>{leagueName}</Text>
 
      <View style={[style.spaceBetween,style.cardContent]}>
        <View style={style.team}>
            <Image source={{uri:`${url}/upload/${teamA.image}`}} style={{ width: 40, height: 50,}} />
        <Text style={[style.mt2,style.smallText,{textAlign:"center"}]}>{teamA.name}</Text>
        </View>

        <View>
            <Text style={style.heading1}>VS</Text>
        </View>
        <View style={style.team}>
            <Image source={{uri:`${url}/upload/${teamB.image}`}} style={{ width:40, height: 50 }} />
        <Text style={[style.mt2,style.smallText,{textAlign:"center"}]}>{teamB.name}</Text>
        </View>

      </View>
    </TouchableOpacity>
      
    
  )
}

export default MatchCard