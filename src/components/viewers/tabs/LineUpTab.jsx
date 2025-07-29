import {View, Text, Image, ImageBackground, ScrollView} from 'react-native';
import React, { useCallback,useState } from 'react';
import {style} from '../../../styles/style';
import { useFocusEffect } from '@react-navigation/native';
import { url } from '../../../constant';

const LineUpTab = ({route}) => {
   const{matchId} = route.params

      const[lineUp,setLineup] = useState({})
  
      async function getLineUp(){
        
        try{
          
          const response = await fetch(`${url}/viewer/getLineup/${matchId}`,{method:"GET"})
          const result  = await response.json()
  
          if(response.ok){
            
            setLineup(result)
          }else{
            setLineup({})
          }
          
        }catch(e){
          console.log("Cannot get live matches");
        }finally{
      
        }
        
      }
      
        useFocusEffect(useCallback(()=>{
          getLineUp()
  
        },[]))

  return (
    <ScrollView>
      <ImageBackground
      source={require('../../../assests/images/linupPic.png')}
      style={style.lineUpField}>
      {/* team 01 */}
      {/* GoalKeeper  */}
      <View style={style.centered}>
        <Image source={{uri:`${url}/upload/${lineUp?.team1?.goalkeeper?.image}`}} style={style.lineUpPlayer}/>
        <Text style={style.PName}>{lineUp?.team1?.goalkeeper?.name}</Text>
      </View>
      {/* Line One  */}
      {/* Line trwo  */}
      <View style={style.teamCenter}>
        {lineUp?.team1?.midfield_defense?.map((item, key) => (
          <View style={[style.centered,{width:"25%"}]} key={key}>
            <Image source={{uri:`${url}/upload/${item?.image}`}} style={style.lineUpPlayer}/>
            <Text style={style.PName}>{item?.name}</Text>
          </View>
        ))}
      </View>

      <View style={style.teamCenter}>
        {lineUp?.team1?.forwards?.map((item, key) => (
          <View style={[style.centered,{width:"25%"}]} key={key}>
            <Image source={{uri:`${url}/upload/${item?.image}`}} style={style.lineUpPlayer}/>
            <Text style={style.PName}>{item?.name}</Text>
          </View>
        ))}
      </View>

      {/* Team O2 */}
      {/* Center  */}
      <View style={style.teamCenter}>
        {lineUp?.team2?.forwards?.map((item, key) => (
          <View style={[style.centered,{width:"25%"}]} key={key}>
            <Image source={{uri:`${url}/upload/${item?.image}`}} style={style.lineUpPlayer}/>
            <Text style={style.PName}>{item?.name}</Text>
          </View>
        ))}
      </View>
      {/*
      {/* Line One  */}
      {/* Line trwo  */}
       <View style={[style.teamCenter,style.teamBCenter]}>
        {lineUp?.team2?.midfield_defense?.map((item, key) => (
          <View style={[style.centered,{width:"25%"}]} key={key}>
            <Image source={{uri:`${url}/upload/${item?.image}`}} style={style.lineUpPlayer}/>
            <Text style={style.PName}>{item?.name}</Text>
          </View>
        ))}
      </View>


      {/*  Goal Keeper */}
      <View style={style.centered}>
        <Image source={{uri:`${url}/upload/${lineUp?.team2?.goalkeeper?.image}`}} style={style.lineUpPlayer}/>
        <Text style={style.PName}>{lineUp?.team2?.goalkeeper?.name}</Text>
      </View>
    </ImageBackground>
    </ScrollView>
  );
};

export default LineUpTab;
