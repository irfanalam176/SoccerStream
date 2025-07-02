import {View, Text} from 'react-native';
import React from 'react';
import ScoreUpdate from '../ScoreUpdate';
import Dashboard from '../Dashboard';
import Feather from 'react-native-vector-icons/Feather';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Colors} from '../../../styles/style';
import TeamCreation from '../TeamCreation';
import MatchCreation from '../MatchCreation';

const adminStack = () => {
  const Tabs = createBottomTabNavigator();
  return (
  <Tabs.Navigator
  screenOptions={{
    headerShown: false,
    tabBarStyle: {backgroundColor: Colors.black},
    tabBarActiveTintColor: Colors.secondary,
    tabBarInactiveTintColor: 'white',
    tabBarLabelStyle: {fontSize: 14},
  }}>
  <Tabs.Screen
    name="Teams"
    component={TeamCreation}
    options={{
      tabBarIcon: ({color, size}) => (
        <Feather name="users" size={30} color={color} />
      ),
    }}
  />
  <Tabs.Screen
    name="Matches"
    component={MatchCreation}
    options={{
      tabBarIcon: ({color, size}) => (
        <Feather name="dribbble" size={30} color={color} />
      ),
    }}
  />
  <Tabs.Screen
    name="dashboard"
    component={Dashboard}
    options={{
      tabBarIcon: ({color, size}) => (
        <Feather name="pie-chart" size={30} color={color} />
      ),
    }}
  />
  <Tabs.Screen
    name="Profile"
    component={ScoreUpdate}
    options={{
      tabBarIcon: ({color, size}) => (
        <Feather name="user" size={30} color={color} />
      ),
    }}
  />
</Tabs.Navigator>

  );
};

export default adminStack;
