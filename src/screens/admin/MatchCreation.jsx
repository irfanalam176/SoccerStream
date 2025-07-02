import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { style } from '../../styles/style';
import { Dropdown } from 'react-native-element-dropdown';
import { Colors } from '../../styles/style';
import Feather from 'react-native-vector-icons/Feather';
import MainBtn from '../../components/comman/MainBtn';

const MatchCreation = () => {
  const data = [
    { label: 'Team A', value: 'A' },
    { label: 'Team B', value: 'B' },
    { label: 'Team C', value: 'C' },
  ];

  const [matches, setMatches] = useState([{ team1: null, team2: null }]);

  const handleMatchChange = (index, teamKey, value) => {
    const updatedMatches = [...matches];
    updatedMatches[index][teamKey] = value;
    setMatches(updatedMatches);
  };

  const handleAddMatch = () => {
    setMatches([...matches, { team1: null, team2: null }]);
  };

  const handleRemoveMatch = (index) => {
    const updatedMatches = [...matches];
    updatedMatches.splice(index, 1);
    setMatches(updatedMatches);
  };

  return (
    <ScrollView style={style.wrapper}>
      <Text style={style.heading1}>Create Matches</Text>

      {matches.map((match, index) => (
        <View key={index} style={{ marginBottom: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {/* Team 1 Dropdown */}
            <View style={{ flex: 1 }}>
              <Dropdown
                style={style.dropdown}
                placeholderStyle={style.placeholderStyle}
                selectedTextStyle={style.selectedTextStyle}
                inputSearchStyle={style.inputSearchStyle}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select Team 1"
                searchPlaceholder="Search..."
                value={match.team1}
                onChange={item => handleMatchChange(index, 'team1', item.value)}
              />
            </View>

            {/* VS Text */}
            <Text style={[style.heading1, { marginHorizontal: 10 }]}>vs</Text>

            {/* Team 2 Dropdown */}
            <View style={{ flex: 1 }}>
              <Dropdown
                style={style.dropdown}
                placeholderStyle={style.placeholderStyle}
                selectedTextStyle={style.selectedTextStyle}
                inputSearchStyle={style.inputSearchStyle}
                iconStyle={style.iconStyle}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select Team 2"
                searchPlaceholder="Search..."
                value={match.team2}
                onChange={item => handleMatchChange(index, 'team2', item.value)}
              />
            </View>
          </View>

          {/* Minus Icon to Remove Match */}
          {matches.length > 1 && (
            <TouchableOpacity
              onPress={() => handleRemoveMatch(index)}
              style={{ marginTop: 8, alignSelf: 'flex-end' }}
            >
              <Feather name="minus-circle" size={24} color={Colors.danger} />
            </TouchableOpacity>
          )}
        </View>
      ))}

      {/* Add Match Button */}
      <TouchableOpacity onPress={handleAddMatch} style={{ alignSelf: 'flex-start', marginVertical: 10 }}>
        <Text style={[style.heading4, { color: Colors.secondary }]}>+ Add Match</Text>
      </TouchableOpacity>

      <MainBtn text={"Create Matches"}/>
    </ScrollView>
  );
};

export default MatchCreation;
