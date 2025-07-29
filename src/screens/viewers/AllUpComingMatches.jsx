import { View, ScrollView } from 'react-native'
import React from 'react'
import { Colors, style } from '../../styles/style'
import Header from '../../components/comman/Header'
import SearchBox from '../../components/comman/SearchBox'
import UpcomingMatchCard from '../../components/viewers/UpcomingMatchCard'

const AllUpComingMatches = () => {
  return (
      <View style={style.wrapper}>
        <Header title={"Upcoming Matches"}/>
        <SearchBox/>
        <ScrollView style={style.cardsContainer}>
             <UpcomingMatchCard />
             <UpcomingMatchCard />
             <UpcomingMatchCard />
        </ScrollView>
      </View>
  )
}

export default AllUpComingMatches