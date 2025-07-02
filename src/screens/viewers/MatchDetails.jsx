import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { style } from '../../styles/style'
import Header from '../../components/comman/Header'
import MatchScoreCard from '../../components/viewers/MatchScoreCard'
import { TopTabs } from '../../components/viewers/TopTabs'

const MatchDetails = ({navigation,route}) => {
    const{color} = route.params
  return (
    <ScrollView style={style.wrapper}>
        <Header title={"Match Details"}/>

        <MatchScoreCard color={color}/>

        <TopTabs/>
    </ScrollView>
  )
}

export default MatchDetails