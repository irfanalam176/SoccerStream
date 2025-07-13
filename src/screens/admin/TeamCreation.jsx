import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Colors, style } from '../../styles/style'
import InputBox from '../../components/comman/InputBox'
import MainBtn from '../../components/comman/MainBtn'
import Feather from 'react-native-vector-icons/Feather';

const TeamCreation = () => {
  const [players, setPlayers] = useState(['']); // array to track player names

  const handleAddPlayer = () => {
    setPlayers([...players, '']);
  };

  const handleRemovePlayer = (index) => {
    if (players.length > 1) {
      const updatedPlayers = [...players];
      updatedPlayers.splice(index, 1);
      setPlayers(updatedPlayers);
    }
  };

  const handlePlayerChange = (text, index) => {
    const updatedPlayers = [...players];
    updatedPlayers[index] = text;
    setPlayers(updatedPlayers);
  };

  return (
    <ScrollView style={style.wrapper}>
      <Text style={style.heading1}>Create Team</Text>
    <View style={style.spaceBetween}>
           <View style={{width:"70%"}}>
            <InputBox label={"Enter Team Name"} />
           </View>
          <TouchableOpacity  >
            <Feather name="plus-circle" color={"white"} size={30} />
          </TouchableOpacity>
    </View>
      <View style={[style.border, style.mb3, { backgroundColor: "white" }]} />

      {/* Dynamic player input fields */}
      {players.map((player, index) => (
        <View key={index} style={[style.spaceBetween, { marginBottom: 10, alignItems: 'center' }]}>
          {/* Remove button on the left */}
          <TouchableOpacity onPress={() => handleRemovePlayer(index)} >
            <Feather name="minus-circle" color={Colors.danger} size={30} />
          </TouchableOpacity>

          {/* Input field */}
          <View style={{ width: "70%",marginRight:20 }}>
            <InputBox
              label={`Player Name ${index + 1}`}
              value={player}
              onChangeText={(text) => handlePlayerChange(text, index)}
            />
          </View>

            <TouchableOpacity >
            <Feather name="plus-circle" color={"white"} size={30} />
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity onPress={handleAddPlayer}>
        <Text style={[style.heading4, { color: Colors.secondary }]}>+ Add Player</Text>
      </TouchableOpacity>

      <MainBtn text={"Create Team"} />

      <View style={style.blankPadding}/>
    </ScrollView>
  );
};

export default TeamCreation;
