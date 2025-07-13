import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { Colors, style } from '../../../styles/style'

const TeamPlayersTab = () => {
  return (
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 7, backgroundColor: '#fff' }}>
      {/* Team Names */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between',gap:10, marginBottom: 10 }}>
        <Text style={{ fontSize: 12, fontWeight: 'bold',width:"50%" }}>Young 11 Sambat</Text>
        <Text style={{ fontSize: 12, fontWeight: 'bold',width:"50%" }}>AbdUllah Shaheed Matta</Text>
      </View>

      {/* Players Row */}
      <View style={[style.playerCards]}>
        {/* Team A Player */}
       <View style={[style.row,style.alignCenter,style.gap2,style.playerRow]}>
          <Image
            source={require("../../../assests/images/rm.png")}
            style={{ width:20, height: 20, }}
          />
          <Text style={{ fontSize:10,fontWeight:"bold"}}>Irfan Alam</Text>
        </View>

        {/* Team B Player */}
        <View style={[style.row,style.alignCenter,style.gap2,style.playerRow]}>
          <Image
            source={require("../../../assests/images/rm.png")}
            style={{ width:20, height: 20, }}
          />
          <Text style={{ fontSize:10,fontWeight:"bold"}}>SajadUllah</Text>
        </View>
      </View>
      
    </ScrollView>
  )
}

export default TeamPlayersTab