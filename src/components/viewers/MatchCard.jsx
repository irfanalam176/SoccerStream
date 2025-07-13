import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors, style } from '../../styles/style'

const MatchCard = ({leagueName,teamA,Score,teamB,backgroundColor,onPress}) => {
  return (  
    <TouchableOpacity 
    style={[{
      backgroundColor:backgroundColor,
    },style.card
    ]}
      onPress={onPress}
    >

    <Text style={{ color: Colors.white, marginBottom: 20 }}>{leagueName}</Text>
 
      <View style={[style.centerRow,style.cardContent]}>
        <View style={style.team}>
            <Image source={teamA.logo} style={{ width: 40, height: 50,}} />
        <Text style={[style.mt2,style.smallText]}>{teamA.name}</Text>
        </View>

        <View>
            <Text style={{ fontSize: 24, color: '#FFF',marginTop:-25 }}>{Score}</Text>
        </View>
        <View style={style.team}>
            <Image source={teamB.logo} style={{ width:40, height: 50 }} />
        <Text style={[style.mt2,style.smallText]}>{teamB.name}</Text>
        </View>

      </View>
    </TouchableOpacity>
      
    
  )
}

export default MatchCard