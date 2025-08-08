import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
  ActivityIndicator
} from 'react-native';
import {style,Colors} from '../../styles/style';
import {Dropdown} from 'react-native-element-dropdown';
import Feather from 'react-native-vector-icons/Feather';
import MainBtn from '../../components/comman/MainBtn';
import {url} from '../../constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Header from '../../components/comman/Header';

const MatchCreation = ({navigation}) => {
  const roundOptions = [
    {label: 'Group Stage', value: 'Group Stage'},
    {label: 'Quarter Final', value: 'Quarter Final'},
    {label: 'Semi Final', value: 'Semi Final'},
    {label: 'Final', value: 'Final'},
  ];
const[isLoading,setIsLoading] = useState(false)
const[teamLoading,setTeamLoading] = useState(false)
  const [teamOptions, setTeamOptions] = useState([]);
  const [matches, setMatches] = useState([
    {
      team1: null,
      team2: null,
      round: null,
      date: new Date(),
      time: new Date(),
      showDatePicker: false,
      showTimePicker: false,
    },
  ]);

  const formatDate = date => {
    return date.toDateString(); // "Thu Jul 24 2025"
  };

  const formatTime = time => {
    return time.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}); // "4:29 PM"
  };

  const handleMatchChange = (index, key, value) => {
    const updated = matches.map((m, i) =>
      i === index ? {...m, [key]: value} : m,
    );
    setMatches(updated);
  };

  const handleAddMatch = () => {
    setMatches([
      ...matches,
      {
        team1: null,
        team2: null,
        round: null,
        date: new Date(),
        time: new Date(),
        showDatePicker: false,
        showTimePicker: false,
      },
    ]);
  };

  const handleRemoveMatch = index => {
    const updated = matches.filter((_, i) => i !== index);
    setMatches(updated);
  };

  const showDatePicker = index => {
    const updated = matches.map((m, i) =>
      i === index ? {...m, showDatePicker: true} : m,
    );
    setMatches(updated);
  };

  const showTimePicker = index => {
    const updated = matches.map((m, i) =>
      i === index ? {...m, showTimePicker: true} : m,
    );
    setMatches(updated);
  };

  const onDateChange = (event, selectedDate, index) => {
    const currentDate = selectedDate || matches[index].date;
    const updated = matches.map((m, i) =>
      i === index ? {...m, showDatePicker: false, date: currentDate} : m,
    );
    setMatches(updated);
  };

  const onTimeChange = (event, selectedTime, index) => {
    const currentTime = selectedTime || matches[index].time;
    const updated = matches.map((m, i) =>
      i === index ? {...m, showTimePicker: false, time: currentTime} : m,
    );
    setMatches(updated);
  };

  async function getTeams() {
    try {
      setTeamLoading(true)
      const adminId = await AsyncStorage.getItem('adminId');
      const response = await fetch(
        `${url}/admin/getTeams/${JSON.parse(adminId)}`,
      );
      const result = await response.json();

      const formattedTeams = result.response.map(team => ({
        label: team.name,
        value: team.id,
      }));

      setTeamOptions(formattedTeams);
    } catch (e) {
      console.log('Cannot get Teams : ' + e);
    }finally{
      setTeamLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      getTeams();
    }, []),
  );

  const handleSubmit = async () => {
    try {
      setIsLoading(true)
      const adminId = await AsyncStorage.getItem('adminId');
      const tournamentId = await AsyncStorage.getItem('tournamentId');
      // Validation
      for (let i = 0; i < matches.length; i++) {
        const m = matches[i];
        if (!m.team1 || !m.team2) {
          Alert.alert(
            'Validation Error',
            `Please select both teams for match ${i + 1}`,
          );
          return;
        }

        if (m.team1 === m.team2) {
          Alert.alert(
            'Validation Error',
            `Team 1 and Team 2 cannot be the same for match ${i + 1}`,
          );
          return;
        }

        if (!m.round) {
          Alert.alert(
            'Validation Error',
            `Please select a round for match ${i + 1}`,
          );
          return;
        }
      }

      const payload = matches.map(match => ({
        tournamentId: JSON.parse(tournamentId),
        team1: match.team1,
        team2: match.team2,
        round: match.round,
        date: formatDate(match.date), // "Thu Jul 24 2025"
        time: formatTime(match.time), // "4:29 PM"
        adminId: JSON.parse(adminId),
      }));

      const response = await fetch(`${url}/admin/createMatch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({matches: payload}),
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Matches created successfully!');
        navigation.navigate('dashboard');
      } else {
        Alert.alert('Error', result.message || 'Failed to create matches.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      Alert.alert('Error', 'An error occurred while creating matches.');
    }finally{
      setIsLoading(false)
    }
  };

  return (
    <ScrollView style={style.wrapper}>
      <Header title={'Match Creation'} />
      {teamLoading&&<ActivityIndicator color={Colors.white} size={30}/>}
      {matches.map((match, index) => (
        <View key={index} style={{marginBottom: 25}}>
          {/* Team Selection */}
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flex: 1}}>
              <Dropdown
                style={style.dropdown}
                placeholderStyle={style.placeholderStyle}
                selectedTextStyle={style.selectedTextStyle}
                inputSearchStyle={style.inputSearchStyle}
                data={teamOptions}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select Team 1"
                searchPlaceholder="Search..."
                containerStyle={{backgroundColor: Colors.success}}
                itemTextStyle={{color: Colors.black}}
                value={match.team1}
                onChange={item => handleMatchChange(index, 'team1', item.value)}
                disable={teamLoading}
              />
            </View>

            <Text style={[style.heading1, {marginHorizontal: 10}]}>vs</Text>

            <View style={{flex: 1}}>
              <Dropdown
                style={style.dropdown}
                placeholderStyle={style.placeholderStyle}
                selectedTextStyle={style.selectedTextStyle}
                inputSearchStyle={style.inputSearchStyle}
                iconStyle={style.iconStyle}
                data={teamOptions}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select Team 2"
                searchPlaceholder="Search..."
                containerStyle={{backgroundColor: Colors.success}}
                itemTextStyle={{color: Colors.black}}
                value={match.team2}
                onChange={item => handleMatchChange(index, 'team2', item.value)}
                disable={teamLoading}
              />
            </View>
          </View>

          {/* Date and Time Buttons */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <TouchableOpacity
              onPress={() => showDatePicker(index)}
              style={{
                backgroundColor: Colors.secondary,
                padding: 10,
                borderRadius: 5,
                flex: 1,
                marginRight: 5,
              }}>
              <Text style={{color: '#fff', textAlign: 'center'}}>
                {formatDate(match.date)}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => showTimePicker(index)}
              style={{
                backgroundColor: Colors.secondary,
                padding: 10,
                borderRadius: 5,
                flex: 1,
                marginLeft: 5,
              }}>
              <Text style={{color: '#fff', textAlign: 'center'}}>
                {formatTime(match.time)}
              </Text>
            </TouchableOpacity>
          </View>

          {/* DateTime Pickers */}
          {match.showDatePicker && (
            <DateTimePicker
              value={match.date}
              mode="date"
              display={Platform.OS === 'ios' ? 'inline' : 'default'}
              onChange={(event, date) => onDateChange(event, date, index)}
            />
          )}

          {match.showTimePicker && (
            <DateTimePicker
              value={match.time}
              mode="time"
              is24Hour={false}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event, time) => onTimeChange(event, time, index)}
            />
          )}

          {/* Round Selection */}
          <Dropdown
            style={[style.dropdown, {marginTop: 10}]}
            placeholderStyle={style.placeholderStyle}
            selectedTextStyle={style.selectedTextStyle}
            inputSearchStyle={style.inputSearchStyle}
            searchPlaceholder='Search here..'
            data={roundOptions}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select Round"
            containerStyle={{backgroundColor: Colors.success}}
            itemTextStyle={{color: Colors.black}}
            value={match.round}
            onChange={item => handleMatchChange(index, 'round', item.value)}
          />

          {/* Remove Match Button */}
          {matches.length > 1 && (
            <TouchableOpacity
              onPress={() => handleRemoveMatch(index)}
              style={{marginTop: 10, alignSelf: 'flex-end'}}>
              <Feather name="minus-circle" size={24} color={Colors.danger} />
            </TouchableOpacity>
          )}
        </View>
      ))}

      {/* Add Match Button */}
      <TouchableOpacity
        onPress={handleAddMatch}
        style={{alignSelf: 'flex-start', marginVertical: 10}}>
        <Text style={[style.heading4, {color: Colors.secondary}]}>
          + Add Match
        </Text>
      </TouchableOpacity>
      {isLoading&&<ActivityIndicator color={Colors.white} size={30}/>}
      <MainBtn text={'Create Matches'} onPress={handleSubmit} disabled={isLoading}/>
    </ScrollView>
  );
};

export default MatchCreation;
