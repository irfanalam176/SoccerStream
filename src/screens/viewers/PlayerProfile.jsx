import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { style } from '../../styles/style'
import Header from '../../components/comman/Header'

const PlayerProfile = () => {
  return (
    <ScrollView style={style.wrapper}>
        <Header title={"Player Profile"}/>
        <Image source={require("../../assests/images/player.jpg")} style={style.playerImage}/>

        <View style={style.playerCard}>
            <View style={[style.spaceBetween,style.border]}>
                <Text style={style.heading3}>Name</Text>
                <Text style={style.heading3}>Ronaldo</Text>
            </View>
           <View style={[style.spaceBetween,style.border]}>
                <Text style={style.heading3}>Age</Text>
                <Text style={style.heading3}>40</Text>
            </View>
              <View style={[style.spaceBetween,style.border]}>
                <Text style={style.heading3}>Shirt Number</Text>
                <Text style={style.heading3}>7</Text>
            </View>
           <View style={[style.spaceBetween,style.border]}>
                <Text style={style.heading3}>Playing Foot</Text>
                <Text style={style.heading3}>Right</Text>
            </View>
          <View style={[style.spaceBetween,style.border]}>
                <Text style={style.heading3}>Position</Text>
                <Text style={style.heading3}>position</Text>
            </View>
           <View style={[style.spaceBetween,style.border]}>
                <Text style={style.heading3}>Club Name</Text>
                <Text style={style.heading3}>c name</Text>
            </View>
        
        </View>
    </ScrollView>
  )
}

export default PlayerProfile