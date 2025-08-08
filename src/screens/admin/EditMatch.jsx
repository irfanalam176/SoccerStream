import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {style, Colors} from '../../styles/style';
import Header from '../../components/comman/Header';
import {Dropdown} from 'react-native-element-dropdown';
import MainBtn from '../../components/comman/MainBtn';
import {url} from '../../constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

const EditMatch = ({navigation, route}) => {
  const {id, teams, date, time, round} = route.params;
  const {team1, team2, team1_id, team2_id} = teams;

  const [teamOptions, setTeamOptions] = useState([]);
  const[isLoading,setIsLoading] = useState(false)
  const [match, setMatch] = useState({
    team1: team1_id,
    team2: team2_id,
    round: round,
    date: new Date(date),
    time: new Date(`1970-01-01T${time}`),
    showDatePicker: false,
    showTimePicker: false,
  });

  const roundOptions = [
    {label: 'Group Stage', value: 'Group Stage'},
    {label: 'Quarter Final', value: 'Quarter Final'},
    {label: 'Semi Final', value: 'Semi Final'},
    {label: 'Final', value: 'Final'},
  ];

  const formatDate = date => date.toDateString();
  const formatTime = time =>
    time.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});

  const handleMatchChange = (field, value) => {
    setMatch(prev => ({...prev, [field]: value}));
  };

  const showDatePicker = () => {
    setMatch(prev => ({...prev, showDatePicker: true}));
  };

  const showTimePicker = () => {
    setMatch(prev => ({...prev, showTimePicker: true}));
  };

  const onDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setMatch(prev => ({
        ...prev,
        date: selectedDate,
        showDatePicker: false,
      }));
    } else {
      setMatch(prev => ({...prev, showDatePicker: false}));
    }
  };

  const onTimeChange = (event, selectedTime) => {
    if (selectedTime) {
      setMatch(prev => ({
        ...prev,
        time: selectedTime,
        showTimePicker: false,
      }));
    } else {
      setMatch(prev => ({...prev, showTimePicker: false}));
    }
  };

  async function getTeams() {
    try {
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
      console.log('Cannot get Teams: ' + e);
    }
  }

  async function handleUpdateMatch() {
    if (
      !match.team1 ||
      !match.team2 ||
      !match.round ||
      !match.date ||
      !match.time
    ) {
      Alert.alert('All fields are required');
      return;
    }

    const formattedDate = match.date.toISOString().split('T')[0]; // yyyy-mm-dd
    const formattedTime = match.time.toTimeString().split(' ')[0]; // hh:mm:ss

    const payload = {
      id,
      team1_id: match.team1,
      team2_id: match.team2,
      round: match.round,
      match_date: formattedDate,
      time: formattedTime,
    };

    try {
      setIsLoading(true)
      const res = await fetch(`${url}/admin/editMatch`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (res.ok) {
        Alert.alert('Success', 'Match updated successfully');
        navigation.goBack();
      } else {
        console.log('Update error:', json);
        Alert.alert('Failed', 'Match update failed');
      }
    } catch (error) {
      console.log('Update match error:', error);
      Alert.alert('Error', 'Something went wrong');
    }finally{
      setIsLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      getTeams();
    }, []),
  );

  return (
    <ScrollView style={style.wrapper}>
      <Header title="Edit Match" />

      {/* Team Selection */}
      <View
        style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
        <View style={{flex: 1}}>
          <Dropdown
            style={style.dropdown}
            placeholderStyle={style.placeholderStyle}
            selectedTextStyle={style.selectedTextStyle}
            data={teamOptions}
            search
            labelField="label"
            valueField="value"
            placeholder="select team 1"
            searchPlaceholder='Search here..'
            containerStyle={{backgroundColor: Colors.success}}
            itemTextStyle={{color: Colors.black}}
            value={match.team1}
            onChange={item => handleMatchChange('team1', item.value)}
          />
        </View>

        <Text style={[style.heading1, {marginHorizontal: 10}]}>vs</Text>

        <View style={{flex: 1}}>
          <Dropdown
            style={style.dropdown}
            placeholderStyle={style.placeholderStyle}
            selectedTextStyle={style.selectedTextStyle}
            data={teamOptions}
            search
            labelField="label"
            valueField="value"
            placeholder="Select team 2"
            searchPlaceholder='Search here..'
            containerStyle={{backgroundColor: Colors.success}}
            itemTextStyle={{color: Colors.black}}
            value={match.team2}
            onChange={item => handleMatchChange('team2', item.value)}
          />
        </View>
      </View>

      {/* Date and Time */}
      <View style={{flexDirection: 'row', marginBottom: 20}}>
        <TouchableOpacity
          style={{
            flex: 1,
            marginRight: 5,
            backgroundColor: Colors.secondary,
            padding: 10,
            borderRadius: 5,
          }}
          onPress={showDatePicker}>
          <Text style={{color: '#fff', textAlign: 'center'}}>
            {formatDate(match.date)}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flex: 1,
            marginLeft: 5,
            backgroundColor: Colors.secondary,
            padding: 10,
            borderRadius: 5,
          }}
          onPress={showTimePicker}>
          <Text style={{color: '#fff', textAlign: 'center'}}>
            {formatTime(match.time)}
          </Text>
        </TouchableOpacity>
      </View>

      {match.showDatePicker && (
        <DateTimePicker
          value={match.date}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={onDateChange}
        />
      )}

      {match.showTimePicker && (
        <DateTimePicker
          value={match.time}
          mode="time"
          is24Hour={false}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onTimeChange}
        />
      )}

      {/* Round */}
      <Dropdown
        style={[style.dropdown, {marginTop: 10}]}
        placeholderStyle={style.placeholderStyle}
        selectedTextStyle={style.selectedTextStyle}
        data={roundOptions}
        labelField="label"
        valueField="value"
        placeholder="Select Round"
        searchPlaceholder='Search here..'
        containerStyle={{backgroundColor: Colors.success}}
        itemTextStyle={{color: Colors.black}}
        value={match.round}
        onChange={item => handleMatchChange('round', item.value)}
      />

{isLoading&&<ActivityIndicator color={Colors.white} size={30}/>}
      {/* Submit */}
      <MainBtn
        text="Update Match"
        onPress={handleUpdateMatch}
        style={{marginTop: 20}}
        disabled={isLoading}
      />
    </ScrollView>
  );
};

export default EditMatch;
