import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import { style } from '../../styles/style'
import Header from '../../components/comman/Header'

const ViewUpcomingMatch = ({navigation}) => {
  return (
    <ScrollView style={style.wrapper}>
        <Header title={"match name"}/>
         <View style={[style.upcommingMatcheCard,style.spaceBetween,{height:200}]} >

<Text style={[style.smallText,style.upcommingMatchDate]}>On 3 March 2025</Text>

             <View style={style.team}>
               <Image
                 source={require('../../assests/images/rm.png')}
                 style={{width: 50, height: 50,objectFit:"contain"}}
               />
               <Text style={[style.mt2, style.smallText]}>Valenica</Text>
             </View>
     
             <View>
               <Text style={{fontSize: 20, color: '#FFF'}}>3:40 pm</Text>
             </View>
             <View style={style.team}>
               <Image
                 source={require('../../assests/images/rm.png')}
                 style={{width: 50, height: 50,objectFit:"contain"}}
               />
               <Text style={[style.mt2, style.smallText]}>RealMadrid</Text>
             </View>
           </View>

           <View style={[style.spaceBetween,style.venueText]}>
            <Text style={style.heading3}>Veniue</Text>
           <Text style={style.heading3}>Matta Ground</Text>
           </View>
     
           <View style={[style.spaceBetween]}>
            <Text style={style.heading3}>Team A</Text>
           <Text style={style.heading3}>Team B</Text>
           </View>

          <View style={style.spaceBetween}>
              <View>
                <TouchableOpacity onPress={()=>navigation.navigate("playerProfile")}>
                <Text style={style.smallText}>I. Alam</Text>
                </TouchableOpacity>
                <Text style={style.smallText}>S. Akbar</Text>
            </View>
            <View>
                <Text style={style.smallText}>I. Alam</Text>
                <Text style={style.smallText}>S. Akbar</Text>
            </View>
          </View>

    </ScrollView>
  )
}

export default ViewUpcomingMatch