import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {style} from '../../styles/style';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
const Header = ({title}) => {
  const navigation = useNavigation();
  return (
    <View style={[style.row, style.gap3, {alignItems: 'center'}]}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Feather name="chevron-left" size={30} color="white" />
      </TouchableOpacity>
      <Text style={style.heading1}>{title}</Text>
    </View>
  );
};

export default Header;
