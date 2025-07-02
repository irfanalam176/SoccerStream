import {View, TextInput, Text} from 'react-native';
import React from 'react';
import { Colors, style } from '../../styles/style';

const InputBox = ({label}) => {
  return (
    <View>
        <Text style={style.heading4}>{label}</Text>
      <TextInput placeholder={`Enter ${label}`} style={style.searchBar} placeholderTextColor={Colors.white}/>
    </View>
  )
}

export default InputBox