import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { style } from '../../styles/style'
import Header from '../../components/comman/Header'
import { url } from '../../constant'

const PlayerProfile = ({navigation,route}) => {
  const{team,name,position,image} = route.params
  return (
    <ScrollView style={style.wrapper}>
        <Header title={"Player Profile"}/>
        <Image source={{uri:`${url}/upload/${image}`}} style={style.playerImage}/>

        <View style={style.playerCard}>
            <View style={[style.spaceBetween,style.border]}>
                <Text style={style.heading3}>Name</Text>
                <Text style={style.heading3}>{name}</Text>
            </View>
           <View style={[style.spaceBetween,style.border]}>
                <Text style={style.heading3}>Team</Text>
                <Text style={style.heading3}>{team}</Text>
            </View>
          <View style={[style.spaceBetween,style.border]}>
                <Text style={style.heading3}>Position</Text>
                <Text style={style.heading3}>{position}</Text>
            </View>
        
        </View>
    </ScrollView>
  )
}

export default PlayerProfile