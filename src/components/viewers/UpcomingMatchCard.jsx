import {View, Text,Image, TouchableOpacity} from 'react-native';
import React from 'react';
import { style } from '../../styles/style';

const UpcomingMatchCard = ({onPress}) => {
  return (
    <TouchableOpacity style={[style.upcommingMatcheCard,style.spaceBetween]} onPress={onPress}>
        <View style={style.team}>
          <Image
            source={require('../../assests/images/rm.png')}
            style={{width: 20, height: 30}}
          />
          <Text style={[style.mt2, style.smallText]}>Valenica</Text>
        </View>

        <View>
          <Text style={{fontSize: 20, color: '#FFF'}}>3:40 pm</Text>
        </View>
        <View style={style.team}>
          <Image
            source={require('../../assests/images/rm.png')}
            style={{width: 20, height: 30}}
          />
          <Text style={[style.mt2, style.smallText]}>RealMadrid</Text>
        </View>
      </TouchableOpacity>
  );
};

export default UpcomingMatchCard;
