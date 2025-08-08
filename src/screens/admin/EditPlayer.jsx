import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator
} from 'react-native';
import React, {useState} from 'react';
import Header from '../../components/comman/Header';
import {style,Colors} from '../../styles/style';
import InputBox from '../../components/comman/InputBox';
import ImagePicker from 'react-native-image-crop-picker';
import {url} from '../../constant';
import MainBtn from '../../components/comman/MainBtn';
import {Dropdown} from 'react-native-element-dropdown';

const EditPlayer = ({navigation, route}) => {
  const {player} = route.params;
  const [name, setName] = useState(player.name);
  const [position, setPosition] = useState(player.position);
  const [image, setImage] = useState(player.image); // New or old image URI
  const [newImageSelected, setNewImageSelected] = useState(false); // Flag to check if new image picked
const[isLoading,setIsLoading] = useState(false)
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

  const pickImage = async () => {
    try {
      const result = await ImagePicker.openPicker({
        width: 400,
        height: 400,
        cropping: true,
        mediaType: 'photo',
      });

      if (result?.path) {
        setImage(result.path);
        setNewImageSelected(true);
      }
    } catch (error) {
      console.log('Image selection cancelled or failed', error);
    }
  };

  const handleSave = async () => {
    const formData = new FormData();

    formData.append('id', player.id); // assuming there's an id
    formData.append('name', name);
    formData.append('position', position);
    formData.append('oldImage', player.image); // send old image filename (e.g. "abc.jpg")

    if (newImageSelected) {
      const filename = image.split('/').pop();
      const fileType = filename.split('.').pop();

      formData.append('image', {
        uri: image,
        type: `image/${fileType}`,
        name: filename,
      });
    }

    try {
      setIsLoading(true)
      const response = await fetch(`${url}/admin/editPlayer`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        Alert.alert('Success', 'Player updated successfully');
        navigation.goBack();
      } else {
        console.log(result);
        Alert.alert('Error', result.message || 'Failed to update player');
      }
    } catch (error) {
      console.error('Save error:', error);
      Alert.alert('Error', 'Something went wrong while saving.');
    }finally{
      setIsLoading(false)
    }
  };

  const getImageSource = () => {
    if (!image) return null;
    if (
      image.startsWith('http') ||
      image.startsWith('file://') ||
      newImageSelected
    ) {
      return {uri: image};
    }
    return {uri: `${url}/upload/${image}`};
  };

  return (
    <ScrollView style={style.wrapper}>
      <Header title="Edit Player" />

      <InputBox label="Name" value={name} onChangeText={setName} />
      <View style={{marginVertical:20}}>
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
            source={getImageSource()}
            style={{width: 200, height: 200, borderRadius: 10}}
          />
        ) : (
          <Text style={{textAlign: 'center'}}>No image selected</Text>
        )}
        <Text style={{textAlign: 'center', marginTop: 10}}>
          Tap to change image
        </Text>
      </TouchableOpacity>
{isLoading&&<ActivityIndicator color={Colors.white} size={30}/>}
      <MainBtn
        text={'Save Changes'}
        onPress={handleSave}
        style={{marginTop: 20}}
        disabled={isLoading}
      />
    </ScrollView>
  );
};

export default EditPlayer;
