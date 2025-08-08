import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {style} from '../../styles/style';

const MainBtn = ({text, onPress, style: customStyle, disabled}) => {
  return (
    <TouchableOpacity
      style={[disabled?style.disableBtn:style.secondaryBtn, customStyle]}
      onPress={onPress}
      disabled={disabled}>
      <Text style={style.btnText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default MainBtn;
