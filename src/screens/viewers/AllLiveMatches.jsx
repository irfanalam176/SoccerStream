import { View, ScrollView, SafeAreaView } from 'react-native'
import React from 'react'
import { Colors, style } from '../../styles/style'
import MatchCard from '../../components/viewers/MatchCard'
import Header from '../../components/comman/Header'
import SearchBox from '../../components/comman/SearchBox'

const AllLiveMatches = () => {
  return (
  <SafeAreaView>
        <View style={style.wrapper}>
        <Header title={"Live Matches"}/>
        <SearchBox/>
         <ScrollView  style={style.cardsContainer}>
            <MatchCard
              leagueName="Champion League"
              teamA={{
                name: 'RealMadrid',
                logo: require('../../assests/images/rm.png'),
              }}
              Score="2:2"
              teamB={{
                name: 'Valencia Fc',
                logo: require('../../assests/images/vc.png'),
              }}
              backgroundColor={Colors.success}
            />
            <MatchCard
              leagueName="Champion League"
              teamA={{
                name: 'Shahbaz Dherai',
                logo: require('../../assests/images/rm.png'),
              }}
              Score="2:1"
              teamB={{
                name: 'Valencia',
                logo: require('../../assests/images/vc.png'),
              }}
              backgroundColor={Colors.black}
            />
            <MatchCard
              leagueName="Champion League"
              teamA={{
                name: 'RealMadrid',
                logo: require('../../assests/images/rm.png'),
              }}
              Score="2:1"
              teamB={{
                name: 'Valencia',
                logo: require('../../assests/images/vc.png'),
              }}
              backgroundColor={Colors.danger}
            />
          
            <View style={style.blankPadding}/>
        </ScrollView>
      </View>
  </SafeAreaView>
  )
}

export default AllLiveMatches