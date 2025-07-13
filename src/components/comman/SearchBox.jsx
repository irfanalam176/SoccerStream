import {View, TextInput} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import { Colors, style } from '../../styles/style';
const SearchBox = () => {
  return (
    <View style={{position:"relative"}}>
        <Feather name="search" size={24} color="white" style={style.searchIcon}/>
      <TextInput placeholder="Search.." style={style.searchBar} placeholderTextColor={Colors.white}/>
    </View>
  );
};

export default SearchBox;
