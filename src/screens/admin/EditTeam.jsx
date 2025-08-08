import {  Text, ScrollView, TouchableOpacity, Image, Alert,ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import Header from '../../components/comman/Header';
import { Colors, style } from '../../styles/style';
import InputBox from '../../components/comman/InputBox';
import ImagePicker from 'react-native-image-crop-picker';
import { url } from '../../constant';
import MainBtn from '../../components/comman/MainBtn';

const EditTeam = ({ navigation, route }) => {
  const { team } = route.params;
  const [name, setName] = useState(team.name);
  const [image, setImage] = useState(team.image); // New or old image URI
  const [newImageSelected, setNewImageSelected] = useState(false); // Flag to check if new image picked
const[isLoading,setIsLoading] = useState(false)
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
    console.log('Image selection canceled or failed', error);
  }
};


  const handleSave = async () => {
    const formData = new FormData();

    formData.append('id', team.id); // assuming there's an id
    formData.append('name', name);
    formData.append('oldImage', team.image); // send old image filename (e.g. "abc.jpg")

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
      const response = await fetch(`${url}/admin/editTeam`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        Alert.alert('Success', 'team updated successfully');
        navigation.goBack();
      } else {
        console.log(result);
        Alert.alert('Error', result.message || 'Failed to update team');
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
    if (image.startsWith('http') || image.startsWith('file://') || newImageSelected) {
      return { uri: image };
    }
    return { uri: `${url}/upload/${image}` };
  };

  return (
    <ScrollView style={style.wrapper}>
      <Header title="Edit Team" />

      <InputBox label="Name" value={name} onChangeText={setName} />

      <TouchableOpacity style={style.imageBtn} onPress={pickImage}>
        {image ? (
          <Image
            source={getImageSource()}
            style={{ width: 200, height: 200, borderRadius: 10 }}
          />
        ) : (
          <Text style={{ textAlign: 'center' }}>No image selected</Text>
        )}
        <Text style={{ textAlign: 'center', marginTop: 10 }}>
          Tap to change image
        </Text>
      </TouchableOpacity>
{isLoading&&<ActivityIndicator color={Colors.white} size={30}/>}
     <MainBtn text={"Save Changes"} onPress={handleSave} style={{marginTop:20}} disabled={isLoading}/>
    </ScrollView>
  );
};

export default EditTeam;
