import { StatusBar } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import ViewerLayout from './src/screens/viewers/layout/ViewerLayout'
import BlankPage from './src/screens/BlankPage'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BroadCaster from './src/screens/Broadcaster/BroadCaster'
import adminStack from './src/screens/admin/layout/adminStack'

const App = () => {
  const Stack = createNativeStackNavigator()
  return (
    <NavigationContainer>
     
      <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName='role'>
        <Stack.Screen name='role' component={BlankPage}/>
        <Stack.Screen name='viewerLayout' component={ViewerLayout}/>
        <Stack.Screen name='broadCaster' component={BroadCaster}/>
        <Stack.Screen name='adminStack' component={adminStack}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App