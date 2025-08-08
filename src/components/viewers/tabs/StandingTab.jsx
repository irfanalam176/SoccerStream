import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { Colors, style } from '../../../styles/style'


const StandingTab = () => {
  return (
    <ScrollView style={{paddingHorizontal:7}}>
      <View style={[style.spaceBetween,style.mb3]}>
        <View >
          <Text style={{color:"yellow"}}>Teams</Text>
        </View>
        
        <View style={{display:"flex",flexDirection:"row",gap:50}}>
            <Text style={{color:"yellow"}}>MP</Text>
            <Text style={{color:"yellow"}}>W</Text>
            <Text style={{color:"yellow"}}>L</Text>
            <Text style={{color:"yellow"}}>P</Text>
        </View>
      </View>


      <View style={[style.spaceBetween,style.pb3,style.pt3,style.borderWhite,style.mb1]}>
        <View >
          <Text style={{color:Colors.white}}>Real Madrid</Text>
        </View>
        
        <View style={{display:"flex",flexDirection:"row",gap:53}}>
            <Text style={{color:Colors.white}}>10</Text>
            <Text style={{color:Colors.white}}>7</Text>
            <Text style={{color:Colors.white}}>3</Text>
            <Text style={{color:Colors.white}}>1</Text>
        </View>
      </View>

   
    </ScrollView>
  )
}

export default StandingTab