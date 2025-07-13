import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { Colors, style } from '../../../styles/style'

const MatchDetailTab = () => {
  return (
    <ScrollView >
      <Text style={{ color: Colors.white }}>Match Details</Text>
   <View style={[style.card, { backgroundColor: Colors.white }]}>
          <View style={[style.spaceBetween,style.pt1,style.pb3,style.border,style.mb3]}>
          <Text style={{fontWeight:"700"}}>Date</Text>
          <Text>Fri, 10 May 2025</Text>
        </View>  
          <View style={[style.spaceBetween,style.pt1,style.pb3,style.border,style.mb3]}>
          <Text style={{fontWeight:"700"}}>Time</Text>
          <Text>3:00 PM</Text>
        </View>  
          <View style={[style.spaceBetween,style.pt1,style.pb3,style.border,style.mb3]}>
          <Text style={{fontWeight:"700"}}>Venue</Text>
          <Text>Matta Ground</Text>
        </View>  
          <View style={[style.spaceBetween,style.pt1,style.pb3,style.border,style.mb3]}>
          <Text style={{fontWeight:"700"}}>League</Text>
          <Text>Ghazi shahhed tournment</Text>
        </View>  
          <View style={[style.spaceBetween,style.pt1,style.pb3,style.border,style.mb3]}>
          <Text style={{fontWeight:"700"}}>Refree</Text>
          <Text>Ghazi shahhed tournment</Text>
        </View>  
          <View style={[style.spaceBetween,style.pt1,style.pb3,style.border,style.mb3]}>
          <Text style={{fontWeight:"700"}}>Refree</Text>
          <Text>Pasha khan</Text>
        </View>  
          <View style={[style.spaceBetween,style.pt1,style.pb3,style.border,style.mb3]}>
          <Text style={{fontWeight:"700"}}>LineMan One</Text>
          <Text>irfan Alam</Text>
        </View>  
          <View style={[style.spaceBetween,style.pt1,style.pb3,style.border,style.mb3]}>
          <Text style={{fontWeight:"700"}}>LineMan Two</Text>
          <Text>Sajid Akbar</Text>
        </View>  
        </View>  

     
    </ScrollView>
  )
}

export default MatchDetailTab