import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {Colors, style} from '../../styles/style';
import InputBox from '../../components/comman/InputBox';
import MainBtn from '../../components/comman/MainBtn';

const AdminLogin = () => {
  return (
    <ScrollView style={{backgroundColor:Colors.primary}}>
      <View
        style={style.loginHeader}>
        <Text style={style.heading1}>Admin Login</Text>
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
          <InputBox label={'User Name'} />
          <InputBox label={'Password'} />
          <MainBtn text={'Login'} />
        </View>
        <View />
      </View>
    </ScrollView>
  );
};

export default AdminLogin;
