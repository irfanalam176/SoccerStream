import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Colors, style} from '../../styles/style';
import Header from '../../components/comman/Header';
import {url} from '../../constant';
import {useState,useCallback} from 'react';
import { useFocusEffect } from '@react-navigation/native';

const TrackPlayers = ({navigation, route}) => {
  const {matchId} = route.params;

  const [players,setPlayers] = useState({})
  const[isLoading,setIsLoading] = useState(false)
  async function getTeams(){
    try{
      setIsLoading(true)
        const response = await fetch(`${url}/admin/getMatchTeams/${matchId}`,{method:"GET"})
        const result = await response.json()
        
        if(response.ok){
          setPlayers(result)
        }else{
          setPlayers({})
        }
        
        
    }catch(e){
      console.log("Cannot Get Teams" + e);
      
    }finally{
      setIsLoading(false)
    }
  }




  useFocusEffect(useCallback(()=>{
    getTeams()
  },[]))

  return (
    <ScrollView style={style.wrapper}>
      <Header title={'Track Players'} />
      {isLoading&&<ActivityIndicator color={Colors.white} size={30}/>}
      <Text style={[style.heading4, {width: 100}]}>{players?.team1?.name}</Text>
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

          {players?.team1?.players.map((item, key) => (
            <TouchableOpacity
              style={style.tRow}
              key={key}>
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

      <Text style={[style.heading4, {width: 100}]}>{players?.team2?.name}</Text>
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

          {players?.team2?.players.map((item, key) => (
            <TouchableOpacity
              style={style.tRow}
              key={key}>
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


    </ScrollView>
  );
};

export default TrackPlayers;
