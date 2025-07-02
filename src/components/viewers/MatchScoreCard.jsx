import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors, style } from '../../styles/style'

const MatchScoreCard = ({color}) => {
  return (  
    <View 
    style={[{
      backgroundColor:color,
    },style.card
    ]}

    >

    <Text style={{ color: Colors.white, marginBottom: 20 }}>prop data</Text>
 
      <View style={[style.centerRow,style.cardContent]}>
        <View style={style.team}>
            <Image source={require('../../assests/images/rm.png')} style={{ width: 40, height: 50,}} />
        <Text style={[style.mt2,style.smallText]}>Real Madrid</Text>
        </View>

        <View>
            <Text style={{ fontSize: 24, color: '#FFF',marginTop:-25 }}>2:2</Text>
        </View>
        <View style={style.team}>
            <Image source={require('../../assests/images/rm.png')} style={{ width:40, height: 50 }} />
        <Text style={[style.mt2,style.smallText]}>Realmadrid</Text>
        </View>

      </View>
    </View>
      
    
  )
}

export default MatchScoreCard