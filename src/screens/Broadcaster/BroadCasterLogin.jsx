import {View, Text, ScrollView, ActivityIndicator} from 'react-native';
import React, {useState} from 'react';
import {Colors, style} from '../../styles/style';
import InputBox from '../../components/comman/InputBox';
import MainBtn from '../../components/comman/MainBtn';
import {url} from '../../constant';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../components/comman/Header';

const BroadCasterLogin = ({navigation}) => {
    const [userNameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
const[isLoading,setIsLoading] = useState(false)
  const [form, setForm] = useState({
    userName: '',
    password: '',
  });

  function handleForm(name, value) {
    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  function validate() {
    const usernameRegex = /^.{6,}$/;
    const passwordRegex = /^(?=.*\d).{9,}$/;

    setUsernameErr('');
    setPasswordErr('');

    if (!usernameRegex.test(form.userName)) {
      setUsernameErr(
        '*Username must be more than 5 characters and have atleast one digit',
      );
      return false;
    }

    if (!passwordRegex.test(form.password)) {
      setPasswordErr(
        '*Password must contain more than 8 characters and atleast one digit',
      );
      return false;
    }

    return true;
  }

  async function handleLogin() {
    if (validate()) {
      try {
        setIsLoading(true)
        const options = {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(form),
        };
        const response = await fetch(`${url}/auth/adminLogin`, options);
        const result = await response.json();
        if (response.ok) {
          Toast.show({
            type: 'success',
            text1: 'Login Successfully',
          });

          await AsyncStorage.setItem(
            'bradcasterAdminIn',
            JSON.stringify(result.response.id),
          );
          await AsyncStorage.setItem(
            'tournamentId',
            JSON.stringify(result.tournamentId),
          );

          navigation.navigate('broadcaster');
        } else {
          Toast.show({
            type: 'error',
            text1: 'User not found',
          });
        }
      } catch (e) {
        console.log('Cannot Login');
      }finally{
        setIsLoading(false)
      }
    }
  }
  return (
  <ScrollView style={{backgroundColor: Colors.primary}}>
      <View style={style.loginHeader}>
       <Header title={"Broadcaster Login"}/>
      </View>
      <View
        style={[
          style.wrapper,
          {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          },
        ]}>
        <View style={{marginTop: 20}}>
          <InputBox
            label={'User Name'}
            onChangeText={e => handleForm('userName', e)}
          />
          <Text style={style.error}>{userNameErr}</Text>
          <InputBox
            label={'Password'}
            onChangeText={e => handleForm('password', e)}
            secureTextEntry={true}
          />
          <Text style={style.error}>{passwordErr}</Text>

          {isLoading&&<ActivityIndicator color={Colors.white} size={30}/>}
          <MainBtn text={'Login'} onPress={handleLogin} disabled={isLoading}/>
        </View>
        <View />
      </View>
    </ScrollView>
  )
}

export default BroadCasterLogin