import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Colors, style} from '../../styles/style';
import Feather from 'react-native-vector-icons/Feather';
import Header from '../../components/comman/Header';
import {io} from 'socket.io-client';
import {useFocusEffect} from '@react-navigation/native';
import {url} from '../../constant';
import MainBtn from '../../components/comman/MainBtn';

const socket = io('http://192.168.87.73:4000', {autoConnect: false});

const ScoreUpdate = ({navigation, route}) => {

  const {id} = route.params;
  const [teams, setTeams] = useState(null);
  const[isLoading,setIsLoading] = useState(false)
  const [score, setScore] = useState({
    teamAScore: 0,
    teamBScore: 0,
  });

  // Initialize redCards as empty object, we will set keys dynamically
  const [redCards, setRedCards] = useState({});

  // Fetch teams on focus
  useFocusEffect(
    useCallback(() => {
      getTeams();
    }, []),
  );

  // After teams load, initialize redCards keys with empty arrays for each team name
  useEffect(() => {
    if (teams?.team1?.name && teams?.team2?.name) {
      setRedCards({
        [teams.team1.name]: [],
        [teams.team2.name]: [],
      });
    }
  }, [teams]);

  async function getTeams() {
    try {
      const response = await fetch(`${url}/admin/getMatchTeams/${id}`, {
        method: 'GET',
      });
      const result = await response.json();

      if (response.ok) {
        setTeams(result);
      } else {
        setTeams(null);
      }
    } catch (e) {
      console.log('Cannot get live matches:', e);
      setTeams(null);
    }
  }

  useFocusEffect(
    useCallback(() => {
      socket.connect();

      socket.emit('join-match', id);
      socket.emit('get-score', id);

      socket.on('score-data', data => {
        setScore({
          teamAScore: data.team_A_score ?? data.teamAScore ?? 0,
          teamBScore: data.team_B_score ?? data.teamBScore ?? 0,
        });
      });

      return () => {
        socket.off('score-data');
        socket.disconnect();
      };
    }, [id]),
  );


  async function finishGame(){
    setIsLoading(true)
    try{
      const response = await fetch(`${url}/admin/finishGame/${id}`,{method:"GET"})
      if(response.ok){
        navigation.goBack()
      }
    }catch(e){
      console.log("Cant close the game"+e);
      
    }finally{
      setIsLoading(false)
    }
  }

  function incrementScore(team) {
    setIsLoading(true)
    setScore(prev => {
      const newScore = {
        ...prev,
        teamAScore: team === 'A' ? prev.teamAScore + 1 : prev.teamAScore,
        teamBScore: team === 'B' ? prev.teamBScore + 1 : prev.teamBScore,
      };

      socket.emit('score-update', {
        matchId: id,
        team,
        action: 'increment',
        score: newScore,
      });

      setIsLoading(false)

      return newScore;
    });
  }

  function decrementScore(team) {
    setIsLoading(true)
    setScore(prev => {
      const newScore = {
        ...prev,
        teamAScore:
          team === 'A' ? Math.max(prev.teamAScore - 1, 0) : prev.teamAScore,
        teamBScore:
          team === 'B' ? Math.max(prev.teamBScore - 1, 0) : prev.teamBScore,
      };

      socket.emit('score-update', {
        matchId: id,
        team,
        action: 'decrement',
        score: newScore,
      });
      setIsLoading(false)
      return newScore;
    });
  }

  function redCard(teamName, player) {
    setRedCards(prev => {
      const currentCards = prev[teamName] || [];
      const isAlreadyRed = currentCards.includes(player);
      const updated = {
        ...prev,
        [teamName]: isAlreadyRed
          ? currentCards.filter(p => p !== player)
          : [...currentCards, player],
      };

      // Emit to server for realtime updates
      socket.emit('card-player', {
        matchId: id,
        teamName,
        player,
        action: isAlreadyRed ? 'remove' : 'add',
      });

      return updated;
    });
  }

  return (
    <ScrollView style={style.wrapper}>
      <Header title={'Score Counter'} />
      <View style={style.upcommingMatcheCard}>
        <MainBtn
          text={'Finish The Game'}
          style={{backgroundColor: 'crimson'}}
          onPress={() =>
            finishGame()
          }
          disabled={isLoading}
        />
        <View style={[style.spaceBetween, {height: 150}]}>
          <View style={style.team}>
            <Text style={[style.mt2, style.heading4]}>
              {teams?.team1?.name}
            </Text>
          </View>

          <View>
            <Text style={{fontSize: 50, color: '#FFF'}}>
              {score.teamAScore}:{score.teamBScore}
            </Text>
          </View>

          <View style={style.team}>
            <Text style={[style.mt2, style.heading4]}>
              {teams?.team2?.name}
            </Text>
          </View>
        </View>
        <MainBtn
          text={'Penalites'}
          style={{backgroundColor: 'orange'}}
          onPress={() =>
            navigation.navigate('penalties', {teams: teams, id: id})
          }
        />
      </View>

      <View style={style.spaceBetween}>
        <View style={style.mt4}>
          <TouchableOpacity
            style={style.counterBtn}
            onPress={() => incrementScore('A')} disabled={isLoading}>
            <Feather name="chevron-up" size={70} color={Colors.white} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[style.counterBtn, {backgroundColor: Colors.danger}]}
            onPress={() => decrementScore('A')} disabled={isLoading}>
            <Feather name="chevron-down" size={70} color={Colors.white} />
          </TouchableOpacity>
        </View>

        <View style={style.mt4}>
          <TouchableOpacity
            style={style.counterBtn}
            onPress={() => incrementScore('B')} disabled={isLoading}>
            <Feather name="chevron-up" size={70} color={Colors.white} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[style.counterBtn, {backgroundColor: Colors.danger}]}
            onPress={() => decrementScore('B')} disabled={isLoading}>
            <Feather name="chevron-down" size={70} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={style.heading1}>Card A Player</Text>
      <View style={style.cardsContainer}>
        <View style={style.spaceBetween}>
          <Text style={style.heading3}>{teams?.team1?.name}</Text>
          <Text style={style.heading3}>{teams?.team2?.name}</Text>
        </View>

        <View style={style.spaceBetween}>
          <View>
            {teams?.team1?.players.map((item, key) => (
              <TouchableOpacity
                key={key}
                onPress={() => redCard(teams.team1.name, item.name)}
                disabled={isLoading}
                >
                <Text
                  style={[
                    style.heading4,
                    {
                      color: redCards[teams.team1.name]?.includes(item.name)
                        ? Colors.danger
                        : Colors.white,
                    },
                  ]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View>
            {teams?.team2?.players.map((item, key) => (
              <TouchableOpacity
                key={key}
                onPress={() => redCard(teams.team2.name, item.name)}
                disabled={isLoading}
                >
                <Text
                  style={[
                    style.heading4,
                    {
                      color: redCards[teams.team2.name]?.includes(item.name)
                        ? Colors.danger
                        : Colors.white,
                    },
                  ]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      <View style={style.blankPadding} />
    </ScrollView>
  );
};

export default ScoreUpdate;
