import React from 'react';
import ScoreUpdate from '../ScoreUpdate';
import Feather from 'react-native-vector-icons/Feather';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Colors} from '../../../styles/style';
import TournamentStack from '../stack/TournamentStack';
import TrackStack from '../stack/TrackStack';
import Profile from '../Profile';

const AdminStack = () => {
  const Tabs = createBottomTabNavigator();
  return (
  <Tabs.Navigator
  screenOptions={{
    headerShown: false,
    tabBarStyle: {backgroundColor: Colors.black},
    tabBarActiveTintColor: Colors.secondary,
    tabBarInactiveTintColor: 'white',
    tabBarLabelStyle: {fontSize: 14},
  }}
  initialRouteName='dashboard'
  >
  <Tabs.Screen
    name="Track"
    component={TrackStack}
    options={{
      tabBarIcon: ({color, size}) => (
        <Feather name="award" size={30} color={color} />
      ),
    }}
  />
  <Tabs.Screen
    name="dashboard"
    component={TournamentStack}
    options={{
      tabBarIcon: ({color, size}) => (
        <Feather name="pie-chart" size={30} color={color} />
      ),
    }}
  />
  <Tabs.Screen
    name="Profile"
    component={Profile}
    options={{
      tabBarIcon: ({color, size}) => (
        <Feather name="user" size={30} color={color} />
      ),
    }}
  />
</Tabs.Navigator>

  );
};

export default AdminStack;
