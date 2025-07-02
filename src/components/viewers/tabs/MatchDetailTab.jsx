import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { Colors, style } from '../../../styles/style'

const MatchDetailTab = () => {
  return (
    <ScrollView >
      <Text style={{ color: Colors.white }}>Match Details</Text>
   <View style={[style.card, { backgroundColor: Colors.white }]}>

       <View style={{ paddingVertical: 5, borderBottomWidth: 1, borderBottomColor: '#ccc', marginBottom: 10,display:"flex",flexDirection:"row",justifyContent:'space-between',paddingHorizontal:5}}>
          <Text style={{fontWeight:"700"}}>Date</Text>
          <Text>Fri, 10 May 2025</Text>
        </View>
       <View style={{ paddingVertical: 5, borderBottomWidth: 1, borderBottomColor: '#ccc', marginBottom: 10,display:"flex",flexDirection:"row",justifyContent:'space-between',paddingHorizontal:5}}>
          <Text style={{fontWeight:"700"}}>Time</Text>
          <Text>5:40 pm</Text>
        </View>
       
       <View style={{ paddingVertical: 5, borderBottomWidth: 1, borderBottomColor: '#ccc', marginBottom: 10,display:"flex",flexDirection:"row",justifyContent:'space-between',paddingHorizontal:5}}>
          <Text>Venue</Text>
          <Text>Dherai Ground</Text>
        </View>
       
       <View style={{ paddingVertical: 5, borderBottomWidth: 1, borderBottomColor: '#ccc', marginBottom: 10,display:"flex",flexDirection:"row",justifyContent:'space-between',paddingHorizontal:5}}>
          <Text>League</Text>
          <Text>Ghazi shahhed tournment</Text>
        </View>
       
       <View style={{ paddingVertical: 5, borderBottomWidth: 1, borderBottomColor: '#ccc', marginBottom: 10,display:"flex",flexDirection:"row",justifyContent:'space-between',paddingHorizontal:5}}>
          <Text>Refree </Text>
          <Text>Pasha khan</Text>
        </View>
       
      </View>
    </ScrollView>
  )
}

export default MatchDetailTab