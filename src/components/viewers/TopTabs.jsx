import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MatchDetailTab from './tabs/MatchDetailTab';
import LineUpTab from './tabs/LineUpTab';
import StandingTab from './tabs/StandingTab';
import TeamPlayersTab from './tabs/TeamPlayersTab';
import { style } from '../../styles/style';
import { Dimensions } from 'react-native';


export function TopTabs() {
    const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator
     screenOptions={{swipeEnabled:true,
      tabBarStyle :style.tabBarStyle,
      tabBarLabelStyle:style.tabBarLabelStyle,
      tabBarIndicatorStyle:style.tabBarIndicatorStyle,
      sceneStyle:style.tabScreenStyle
     }}
     
     style={{height:Dimensions.get("window").height/1.45}}
     >
      <Tab.Screen name="matchDetailsTab" component={MatchDetailTab} options={{title:"Details"}}/>
      <Tab.Screen name="lineUpTab" component={LineUpTab} options={{title:"Line Up"}}/>
      <Tab.Screen name="standingTab" component={StandingTab} options={{title:"Standing"}}/>
      <Tab.Screen name="teamPlayersTab" component={TeamPlayersTab} options={{title:"Players"}} />
    </Tab.Navigator>
  );
}
