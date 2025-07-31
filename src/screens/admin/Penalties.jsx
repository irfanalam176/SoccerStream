import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors, style} from '../../styles/style';
import Header from '../../components/comman/Header';
import Feather from 'react-native-vector-icons/Feather';
import { io } from 'socket.io-client';

const socket = io('http://192.168.87.73:4000', { autoConnect: true });

const Penalties = ({route}) => {
  const {teams, id} = route.params;

  const [penalties, setPenalties] = useState({ teamA: [], teamB: [] });

  useEffect(() => {
    socket.connect();
    socket.emit('join-match', id);
    socket.emit('get-penalties', id);

    socket.on('penalties-data', data => {
      setPenalties(data);
    });

    return () => {
      socket.off('penalties-data');
      socket.disconnect();
    };
  }, [id]);

  const updatePenalty = (teamKey, value) => {
    const index = penalties[teamKey].length;
    const updated = { ...penalties };
    updated[teamKey] = [...updated[teamKey], value];
    setPenalties(updated);

    socket.emit('update-penalty', {
      matchId: id,
      teamKey,
      index,
      value,
    });
  };

  return (
    <ScrollView style={style.wrapper}>
      <Header title={'Penalties'} />
      <View style={style.penalityCard}>
        <View style={[style.spaceBetween]}>
          <Text style={[style.heading4, {width: 100}]}>{teams?.team1?.name}</Text>
          <Text style={style.heading1}>VS</Text>
          <Text style={[style.heading4, {width: 100}]}>{teams?.team2?.name}</Text>
        </View>

        <View style={[style.spaceBetween, style.p3, {backgroundColor: Colors.black}]}>
          <View style={style.penality}>
            {penalties.teamA.map((val, idx) => (
              <Feather
                key={idx}
                name={val === 1 ? 'check-circle' : 'x-circle'}
                size={25}
                color={val === 1 ? 'green' : 'red'}
              />
            ))}
          </View>
          <View style={style.penality}>
            {penalties.teamB.map((val, idx) => (
              <Feather
                key={idx}
                name={val === 1 ? 'check-circle' : 'x-circle'}
                size={25}
                color={val === 1 ? 'green' : 'red'}
              />
            ))}
          </View>
        </View>
      </View>

      <View style={style.spaceBetween}>
        <View style={style.mt4}>
          <TouchableOpacity
            style={style.counterBtn}
            onPress={() => updatePenalty('teamA', 1)}>
            <Feather name="check-circle" size={70} color={Colors.white} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[style.counterBtn, {backgroundColor: Colors.danger}]}
            onPress={() => updatePenalty('teamA', 0)}>
            <Feather name="x-circle" size={70} color={Colors.white} />
          </TouchableOpacity>
        </View>

        <View style={style.mt4}>
          <TouchableOpacity
            style={style.counterBtn}
            onPress={() => updatePenalty('teamB', 1)}>
            <Feather name="check-circle" size={70} color={Colors.white} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[style.counterBtn, {backgroundColor: Colors.danger}]}
            onPress={() => updatePenalty('teamB', 0)}>
            <Feather name="x-circle" size={70} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Penalties;
