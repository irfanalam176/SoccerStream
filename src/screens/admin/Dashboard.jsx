import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { style } from '../../styles/style'
import Header from '../../components/comman/Header'
import UpcomingMatchCard from '../../components/viewers/UpcomingMatchCard'

const Dashboard = ({navigation}) => {
  return (
       <View style={style.wrapper}>
        <Header title={"Upcoming Matches"}/>
        <ScrollView style={style.cardsContainer}>
             <UpcomingMatchCard onPress={()=>navigation.navigate("scoreUpdate")}/>
             <UpcomingMatchCard />
             <UpcomingMatchCard />
        </ScrollView>
      </View>
  )
}

export default Dashboard