import {View, Text, Image, ImageBackground, ScrollView} from 'react-native';
import React from 'react';
import {style} from '../../../styles/style';

const LineUpTab = () => {
  const teamA = [
    'irfan alam',
    'sajid akbar',
    'kalim khan',
    'sajjad khan',
    'irfan alam',
    'sajid akbar',
    'kalim khan',
    'sajjad khan',
  ];
  return (
    <ScrollView>
      <ImageBackground
      source={require('../../../assests/images/linupPic.png')}
      style={style.lineUpField}>
      {/* team 01 */}
      {/* GoalKeeper  */}
      <View style={style.centered}>
        <Text style={style.nameAbr}>SA</Text>
        <Text style={style.PName}>Sajid Akbar</Text>
      </View>
      {/* Line One  */}
      {/* Line trwo  */}
      <View style={style.teamCenter}>
        {teamA.map((item, key) => (
          <View style={style.centered} key={key}>
            <Text style={style.nameAbr}>
              {item
                .split(' ')
                .map(word => word[0])
                .join('')
                .toUpperCase()}
            </Text>
            <Text style={style.PName}>{item}</Text>
          </View>
        ))}
      </View>

      {/* Center  */}
 <View style={style.centerRow}>
       <View style={style.centered}>
        <Text style={style.nameAbr}>SA</Text>
        <Text style={style.PName}>Sajid Akbar</Text>
      </View>
      <View style={style.centered}>
        <Text style={style.nameAbr}>SA</Text>
        <Text style={style.PName}>Sajid Akbar</Text>
      </View>

 </View>
      {/* Team O2 */}
      {/* Center  */}
 <View style={style.centerRow}>
       <View style={style.centered}>
        <Text style={style.nameAbr}>SA</Text>
        <Text style={style.PName}>Sajid Akbar</Text>
      </View>
      <View style={style.centered}>
        <Text style={style.nameAbr}>SA</Text>
        <Text style={style.PName}>Sajid Akbar</Text>
      </View>

 </View>
      {/*
      {/* Line One  */}
      {/* Line trwo  */}
      <View style={[style.teamCenter,style.teamBCenter]}>
        {teamA.map((item, key) => (
          <View style={style.centered}>
            <Text style={style.nameAbr}>
              {item
                .split(' ')
                .map(word => word[0])
                .join('')
                .toUpperCase()}
            </Text>
            <Text style={style.PName}>{item}</Text>
          </View>
        ))}
      </View>
      {/*  Goal Keeper */}
      <View style={style.centered}>
        <Text style={style.nameAbr}>SA</Text>
        <Text style={style.PName}>Sajid Akbar</Text>
      </View>
    </ImageBackground>
    </ScrollView>
  );
};

export default LineUpTab;
