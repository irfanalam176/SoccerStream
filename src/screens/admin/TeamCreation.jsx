import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors, style} from '../../styles/style';
import InputBox from '../../components/comman/InputBox';
import MainBtn from '../../components/comman/MainBtn';
import Feather from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-crop-picker';
import {url} from '../../constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../components/comman/Header';
import {Dropdown} from 'react-native-element-dropdown';
const TeamCreation = () => {
  const [players, setPlayers] = useState([
    {name: null, position: null, image: null},
  ]);
  const [teamName, setTeamName] = useState('');
  const [teamImage, setTeamImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const positions = [
    {label: 'GOALKEEPER', value: 'GOALKEEPER'},
    {label: 'FULL-BACK', value: 'FULL-BACK'},
    {label: 'CENTRE-BACK', value: 'CENTRE-BACK'},
    {label: 'SWEEPER', value: 'SWEEPER'},
    {label: 'DEFENCSIVE-MIDFIELDER', value: 'DEFENCSIVE-MIDFIELDER'},
    {label: 'WING-BACK', value: 'WING-BACK'},
    {label: 'CENTRAL-MIDFIELDER', value: 'CENTRAL-MIDFIELDER'},
    {label: 'ATTACKING-MIDFIELDER', value: 'ATTACKING-MIDFIELDER'},
    {label: 'FORWARD', value: 'FORWARD'},
    {label: 'STRIKER', value: 'STRIKER'},
    {label: 'WINGER', value: 'WINGER'},
  ];

  const handleAddPlayer = () => {
    setPlayers([...players, {name: '', position: '', image: null}]);
  };

  const handleRemovePlayer = index => {
    if (players.length > 1) {
      const updatedPlayers = [...players];
      updatedPlayers.splice(index, 1);
      setPlayers(updatedPlayers);
    }
  };

  const handlePlayerChange = (field, value, index) => {
    const updatedPlayers = [...players];
    updatedPlayers[index][field] = value;
    setPlayers(updatedPlayers);
  };

  const openPlayerGallery = async index => {
    try {
      const result = await ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
        mediaType: 'photo',
      });

      if (result?.path) {
        const updatedPlayers = [...players];
        updatedPlayers[index].image = result.path;
        setPlayers(updatedPlayers);
      }
    } catch (error) {
      console.log('Image selection cancelled', error);
    }
  };

  const openTeamGallery = async () => {
    try {
      const result = await ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
        cropperCircleOverlay: false,
        mediaType: 'photo',
      });

      if (result?.path) {
        setTeamImage(result.path);
      }
    } catch (error) {
      console.log('Image selection cancelled', error);
    }
  };

  const handlePosition = (index, value) => {
    const updatedPlayers = [...players];
    updatedPlayers[index].position = value;
    setPlayers(updatedPlayers);
  };

  // Send team data + images to backend
  const handleCreateTeam = async () => {
    const adminId = await AsyncStorage.getItem('adminId');

    for (let i = 0; i < players.length; i++) {
      const player = players[i];
      if (!player.name || !player.position || !player.image) {
        Alert.alert('Error', `Please fill all fields for Player ${i + 1}`);
        return; 
      }
    }

    if (teamName == '' || !teamImage) {
      Alert.alert('Error', 'Please Provide team name and image');
      return;
    }

    const formData = new FormData();

    formData.append('teamName', teamName);
    formData.append('adminId', JSON.parse(adminId));
    if (teamImage) {
      formData.append('teamImage', {
        uri: teamImage,
        name: 'team_image.jpg',
        type: 'image/jpeg',
      });
    }

    players.forEach((player, index) => {
      formData.append(`players[${index}][name]`, player.name);
      formData.append(`players[${index}][position]`, player.position);
      if (player.image) {
        formData.append(`players[${index}][image]`, {
          uri: player.image,
          name: `player_${index + 1}.jpg`,
          type: 'image/jpeg',
        });
      }
    });

    try {
      setIsLoading(true);
      const response = await fetch(`${url}/admin/teamCreation`, {
        // change URL accordingly
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      if (response.ok) {
        Alert.alert('Success', 'Team Created Successfully');
      }
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('Team created successfully:', responseData);
    } catch (error) {
      console.error('Failed to create team:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={style.wrapper}>
      <Header title={'Team Creation'} />

      {/* Team name input and image */}
      <View
        style={[style.spaceBetween, {alignItems: 'center', marginBottom: 15}]}>
        <View style={{width: '70%'}}>
          <InputBox
            label={'Enter Team Name'}
            value={teamName}
            onChangeText={setTeamName}
          />
        </View>

        <TouchableOpacity onPress={openTeamGallery}>
          {teamImage ? (
            <Image
              source={{uri: teamImage}}
              style={{width: 40, height: 40, borderRadius: 20}}
            />
          ) : (
            <Feather name="plus-circle" color={'white'} size={30} />
          )}
        </TouchableOpacity>
      </View>

      <View style={[style.border, style.mb3, {backgroundColor: 'white'}]} />

      {/* Player inputs */}
      {players.map((player, index) => (
        <View
          key={index}
          style={[
            style.spaceBetween,
            {marginBottom: 10, alignItems: 'center', flexDirection: 'column'},
          ]} // column so inputs stack vertically
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              marginBottom: 5,
            }}>
            {/* Remove button */}
            <TouchableOpacity onPress={() => handleRemovePlayer(index)}>
              <Feather name="minus-circle" color={Colors.danger} size={30} />
            </TouchableOpacity>

            {/* Player name input */}
            <View style={{flex: 1, marginLeft: 10}}>
              <InputBox
                label={`Player Name ${index + 1}`}
                value={player.name}
                onChangeText={text => handlePlayerChange('name', text, index)}
              />
            </View>

            {/* Image picker */}
            <TouchableOpacity
              onPress={() => openPlayerGallery(index)}
              style={{marginLeft: 10}}>
              {player.image ? (
                <Image
                  source={{uri: player.image}}
                  style={{width: 40, height: 40, borderRadius: 20}}
                />
              ) : (
                <Feather name="plus-circle" color={'white'} size={30} />
              )}
            </TouchableOpacity>
          </View>

          {/* Position input below name */}
          <View style={{width: '85%', marginLeft: 40}}>
            <Dropdown
              style={style.dropdown}
              placeholderStyle={style.placeholderStyle}
              selectedTextStyle={style.selectedTextStyle}
              inputSearchStyle={style.inputSearchStyle}
              data={positions}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select Position"
              searchPlaceholder="Search..."
              dropdownPosition="top"
              containerStyle={{backgroundColor: Colors.success}}
              itemTextStyle={{color: Colors.black}}
              value={player.position}
              onChange={item => handlePosition(index, item.value)}
            />
          </View>
        </View>
      ))}

      {/* Add player button */}
      <TouchableOpacity onPress={handleAddPlayer}>
        <Text style={[style.heading4, {color: Colors.secondary}]}>
          + Add Player
        </Text>
      </TouchableOpacity>

      {/* Submit button */}
      {isLoading && <ActivityIndicator color={Colors.white} size={30} />}
      <MainBtn
        text={'Create Team'}
        onPress={handleCreateTeam}
        disabled={isLoading}
      />

      <View style={style.blankPadding} />
    </ScrollView>
  );
};

export default TeamCreation;
