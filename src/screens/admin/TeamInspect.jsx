import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {Colors, style} from '../../styles/style';
import Header from '../../components/comman/Header';
import {url} from '../../constant';
import {useState, useCallback} from 'react';
import MainBtn from '../../components/comman/MainBtn';
import {useFocusEffect} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import InputBox from '../../components/comman/InputBox'; // Assuming you have this
import {Dropdown} from 'react-native-element-dropdown';
const TeamInspect = ({navigation, route}) => {
  const {teamId} = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [teamLoading, setTeamLoading] = useState(false);
  const [addTeamLaoding, setAddTeamLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState({});
  const [players, setPlayers] = useState([]);

  const [addModalVisible, setAddModalVisible] = useState(false);
  const [name, setName] = useState(null);
  const [position, setPosition] = useState(null);
  const [image, setImage] = useState(null);

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

  async function getTeams() {
    try {
      setTeamLoading(true);
      const response = await fetch(`${url}/admin/getPlayers/${teamId}`);
      const result = await response.json();
      if (response.ok) {
        setPlayers(result);
      } else {
        setPlayers([]);
      }
    } catch (e) {
      console.log('Cannot Get Teams: ' + e);
    } finally {
      setTeamLoading(false);
    }
  }

  async function deletePlayer() {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${url}/admin/deletePlayer/${selectedPlayer.id}`,
        {method: 'DELETE'},
      );
      if (response.ok) {
        getTeams();
      }
    } catch (e) {
      Alert.alert('Error', 'Server Error');
    } finally {
      setIsLoading(false);
      setModalVisible(false);
    }
  }

  async function handleSave() {
    if (!name || !position || !image) {
      Alert.alert('All Fields are required');
      return;
    }

    const formData = new FormData();

    formData.append('name', name);
    formData.append('position', position);
    formData.append('team_id', teamId);

    formData.append('image', {
      uri: image.uri,
      type: image.type,
      name: image.fileName || `image-${Date.now()}.jpg`,
    });

    try {
      setAddTeamLoading(true);
      const res = await fetch(`${url}/admin/addPlayer`, {
        method: 'POST',
        headers: {},
        body: formData,
      });

      if (res.ok) {
        getTeams();
        setAddModalVisible(false);
        setName('');
        setPosition('');
        setImage(null);
      } else {
        const errRes = await res.json();
        console.log('Server responded with:', errRes);
        Alert.alert('Failed to add player');
      }
    } catch (error) {
      console.log('Add player error:', error);
      Alert.alert('An error occurred while uploading');
    } finally {
      setAddTeamLoading(false);
    }
  }

  const pickImage = async () => {
    try {
      const result = await ImagePicker.openPicker({
        width: 400,
        height: 400,
        cropping: true,
        mediaType: 'photo',
      });

      if (result?.path) {
        setImage({
          uri: result.path,
          type: result.mime || 'image/jpeg',
          fileName: result.path.split('/').pop(),
        });
      }
    } catch (error) {
      console.log('Image selection cancelled or failed', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getTeams();
    }, []),
  );

  return (
    <ScrollView style={style.wrapper}>
      <Header title={'Track Players'} />
      {teamLoading && <ActivityIndicator color={Colors.white} size={30} />}
      {/* 🔵 Add Player Button */}
      <MainBtn
        text="Add Player"
        style={{marginBottom: 10, alignSelf: 'flex-end'}}
        onPress={() => setAddModalVisible(true)}
      />

      {/* 🔵 Team Name */}
      <Text style={[style.heading4, {width: 100}]}>{players?.team1?.name}</Text>

      {/* 🔵 Player Table */}
      <ScrollView contentContainerStyle={style.table} horizontal={true}>
        <View style={style.tData}>
          <View style={style.tHead}>
            <View style={style.th}>
              <Text style={style.thText}>#SNO</Text>
            </View>
            <View style={style.th}>
              <Text style={style.thText}>Img</Text>
            </View>
            <View style={style.th}>
              <Text style={style.thText}>name</Text>
            </View>
            <View style={style.th}>
              <Text style={style.thText}>position</Text>
            </View>
          </View>

          {players?.map((item, key) => (
            <TouchableOpacity
              style={style.tRow}
              key={key}
              onPress={() => {
                setSelectedPlayer(item);
                setModalVisible(true);
              }}>
              <View style={style.td}>
                <Text style={style.tdText}>{key + 1}</Text>
              </View>
              <View style={style.td}>
                <Image
                  source={{uri: `${url}/upload/${item?.image}`}}
                  style={style.tableImage}
                />
              </View>
              <View style={style.td}>
                <Text style={style.tdText}>{item?.name}</Text>
              </View>
              <View style={style.td}>
                <Text style={style.tdText}>{item?.position}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* 🔴 Modal for Edit/Delete */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View style={style.modalBody}>
            <Text style={style.heading3}>Player {selectedPlayer?.name}</Text>
            <Text style={[style.heading4, {marginVertical: 10}]}>
              Do You Want to Edit or Delete this Match ?
            </Text>
            {isLoading && <ActivityIndicator color={Colors.white} size={30} />}
            <View style={[style.spaceBetween, style.gap3]}>
              <MainBtn
                text="Delete"
                style={{flex: 1, backgroundColor: Colors.danger}}
                onPress={deletePlayer}
                disabled={isLoading}
              />
              <MainBtn
                text="Edit"
                style={{flex: 1, backgroundColor: Colors.blue}}
                onPress={() => {
                  navigation.navigate('editPlayer', {player: selectedPlayer});
                  setModalVisible(false);
                }}
                disabled={isLoading}
              />
              <MainBtn
                text="Cancel"
                style={{flex: 1, backgroundColor: Colors.grey}}
                onPress={() => setModalVisible(false)}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* 🟢 Modal for Add Player */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={addModalVisible}
        onRequestClose={() => setAddModalVisible(false)}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View style={style.modalBody}>
            <Text style={style.heading3}>Add Player</Text>

            <InputBox label="Name" value={name} onChangeText={setName} />
            <View style={{marginVertical: 20}}>
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
                value={position}
                onChange={item => setPosition(item.value)}
              />
            </View>

            <TouchableOpacity style={style.imageBtn} onPress={pickImage}>
              {image ? (
                <Image
                  source={{uri: image.uri}}
                  style={{
                    width: 300,
                    height: 300,
                    borderRadius: 10,
                    aspectRatio: 1 / 1,
                  }}
                />
              ) : (
                <Text style={{textAlign: 'center'}}>No image selected</Text>
              )}
              <Text style={{textAlign: 'center', marginTop: 10}}>
                Tap to change image
              </Text>
            </TouchableOpacity>
            {addTeamLaoding && (
              <ActivityIndicator color={Colors.white} size={30} />
            )}

            <MainBtn
              text="Save Changes"
              onPress={handleSave}
              style={{marginTop: 20}}
              disabled={addTeamLaoding}
            />
            <MainBtn
              text="Cancel"
              onPress={() => setAddModalVisible(false)}
              style={{marginTop: 10, backgroundColor: Colors.grey}}
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default TeamInspect;
