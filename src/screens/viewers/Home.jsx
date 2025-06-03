import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Colors, style} from '../../styles/style';
import {getNext7Days} from '../utils/getNext7Days';
import MatchCard from '../../components/viewers/MatchCard';
import UpcomingMatchCard from '../../components/viewers/UpcomingMatchCard';

const Home = ({navigation}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const days = getNext7Days();

const cardColors=[Colors.success,Colors.black,Colors.danger]

  const trendingMatches = [
    {
      leagueName: 'league name',
      teamA: {
        name: 'name 1',
        logo: require('../../assests/images/rm.png'),
      },
      teamB: {
        name: 'name 2',
        logo: require('../../assests/images/vc.png'),
      },
      score: '2:2',
    },
    {
      leagueName: 'league name',
      teamA: {
        name: 'name 1',
        logo: require('../../assests/images/rm.png'),
      },
      teamB: {
        name: 'name 2',
        logo: require('../../assests/images/vc.png'),
      },
      score: '2:2',
    },
    {
      leagueName: 'league name',
      teamA: {
        name: 'name 1',
        logo: require('../../assests/images/rm.png'),
      },
      teamB: {
        name: 'name 2',
        logo: require('../../assests/images/vc.png'),
      },
      score: '2:2',
    },
  ];

  return (
    <ScrollView style={style.wrapper}>
      <Text style={style.heading1}>Home</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{marginVertical: 10}}>
        {days.map((day, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedIndex(index)}
            style={{
              backgroundColor:
                selectedIndex === index ? Colors.secondary : '#FFF',
              paddingVertical: 10,
              paddingHorizontal: 12,
              borderRadius: 10,
              marginRight: 8,
              borderWidth: 1,
              borderColor: Colors.secondary,
            }}>
            <Text
              style={{
                color: selectedIndex === index ? '#FFF' : Colors.secondary,
                textAlign: 'center',
              }}>
              {day.label} {'\n'} {day.date}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View>
        <View style={style.spaceBetween}>
          <Text style={[style.heading2]}>Live Matches</Text>
          <TouchableOpacity onPress={()=>navigation.navigate("allLive")}>
            <Text style={style.links}>See All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={[style.spaceBetween, style.gap3]}>

          {
            trendingMatches.map((item,key)=>(
              <MatchCard
              key={key}
                leagueName={item.leagueName}
                teamA={item.teamA}
                Score={item.score}
                teamB={item.teamB}
                backgroundColor={cardColors[key]}

                onPress={()=>console.log("navigate to view this match")}
              />
            ))
          }

          </View>
        </ScrollView>
      </View>

      <View style={style.spaceBetween}>
        <Text style={[style.heading2]}>Upcoming Matches</Text>
        <TouchableOpacity>
          <Text style={style.links}>See All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={style.cardsContainer}>
        <UpcomingMatchCard />
        <UpcomingMatchCard />
        <UpcomingMatchCard />
        <UpcomingMatchCard />
        <UpcomingMatchCard />
        <UpcomingMatchCard />
        <UpcomingMatchCard />
        <UpcomingMatchCard />
        <View style={style.blankPadding} />
      </ScrollView>
    </ScrollView>
  );
};

export default Home;
