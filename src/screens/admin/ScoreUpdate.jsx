import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Colors, style} from '../../styles/style';
import Feather from 'react-native-vector-icons/Feather';
import Header from '../../components/comman/Header';

const ScoreUpdate = () => {
  const [score, setScore] = useState({
    teamAScore: 0,
    teamBScore: 0,
  });

  const [redCards, setRedCards] = useState({
    teamA: [],
    teamB: [],
  });

  function incrementScore(team) {
    setScore(prev => {
      if (team === 'A') {
        return {
          ...prev,
          teamAScore: prev.teamAScore + 1,
        };
      } else if (team === 'B') {
        return {
          ...prev,
          teamBScore: prev.teamBScore + 1,
        };
      }
      return prev;
    });
  }

  function decrementScore(team) {
    setScore(prev => {
      if (team === 'A') {
        return {
          ...prev,
          teamAScore: Math.max(prev.teamAScore - 1, 0),
        };
      } else if (team === 'B') {
        return {
          ...prev,
          teamBScore: Math.max(prev.teamBScore - 1, 0),
        };
      }
      return prev;
    });
  }

function redCard(team, player) {
  setRedCards(prev => {
    const isAlreadyRed = prev[team].includes(player);
    return {
      ...prev,
      [team]: isAlreadyRed
        ? prev[team].filter(p => p !== player) 
        : [...prev[team], player], 
    };
  });
}

  return (
     <ScrollView style={style.wrapper}>
         <Header title={"Score Counter"}/>
      <View
        style={[style.upcommingMatcheCard, style.spaceBetween, {height: 200}]}>
        <View style={style.team}>
          <Image
            source={require('../../assests/images/rm.png')}
            style={{width: 50, height: 50, objectFit: 'contain'}}
          />
          <Text style={[style.mt2, style.smallText]}>Valenica</Text>
        </View>

        <View>
          <Text style={{fontSize: 50, color: '#FFF'}}>
            {score.teamAScore}:{score.teamBScore}
          </Text>
        </View>
        <View style={style.team}>
          <Image
            source={require('../../assests/images/rm.png')}
            style={{width: 50, height: 50, objectFit: 'contain'}}
          />
          <Text style={[style.mt2, style.smallText]}>RealMadrid</Text>
        </View>
      </View>

      {/* buttons */}
      <View style={style.spaceBetween}>
        {/* team A counter */}
        <View style={style.mt4}>
          <TouchableOpacity
            style={style.counterBtn}
            onPress={() => incrementScore('A')}>
            <Feather name="chevron-up" size={70} color={Colors.white} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[style.counterBtn, {backgroundColor: Colors.danger}]}
            onPress={() => decrementScore('A')}>
            <Feather name="chevron-down" size={70} color={Colors.white} />
          </TouchableOpacity>
        </View>

        {/* team B counter */}
        <View style={style.mt4}>
          <TouchableOpacity
            style={style.counterBtn}
            onPress={() => incrementScore('B')}>
            <Feather name="chevron-up" size={70} color={Colors.white} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[style.counterBtn, {backgroundColor: Colors.danger}]}
            onPress={() => decrementScore('B')}>
            <Feather name="chevron-down" size={70} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </View>
      {/* red card */}
      <Text style={style.heading1}>Card A Player</Text>
      <View style={style.cardsContainer}>
        <View style={[style.spaceBetween]}>
          <Text style={style.heading3}>Team A</Text>
          <Text style={style.heading3}>Team B</Text>
        </View>

            <View style={style.spaceBetween}>
  <View>
    <TouchableOpacity onPress={() => redCard('teamA', 'I. Alam')}>
      <Text
        style={[
          style.heading4,
          {color: redCards.teamA.includes('I. Alam') ? Colors.danger : Colors.white},
        ]}>
        I. Alam
      </Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => redCard('teamA', 'S. Akbar')}>
      <Text
        style={[
          style.heading4,
          {color: redCards.teamA.includes('S. Akbar') ? Colors.danger : Colors.white},
        ]}>
        S. Akbar
      </Text>
    </TouchableOpacity>
  </View>
  <View>
    <TouchableOpacity onPress={() => redCard('teamB', 'I. Alam')}>
      <Text
        style={[
          style.heading4,
          {color: redCards.teamB.includes('I. Alam') ? Colors.danger : Colors.white},
        ]}>
        I. Alam
      </Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => redCard('teamB', 'S. Akbar')}>
      <Text
        style={[
          style.heading4,
          {color: redCards.teamB.includes('S. Akbar') ? Colors.danger : Colors.white},
        ]}>
        S. Akbar
      </Text>
    </TouchableOpacity>
  </View>
</View>

    
    
      </View>
      <View style={style.blankPadding} />
    </ScrollView>
  )
}

export default ScoreUpdate