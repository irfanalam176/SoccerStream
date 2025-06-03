import { StatusBar } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import ViewerLayout from './src/screens/viewers/layout/ViewerLayout'
import BlankPage from './src/screens/BlankPage'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const App = () => {
  const Stack = createNativeStackNavigator()
  return (
    <NavigationContainer>
      <StatusBar hidden/>
      <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName='role'>
        <Stack.Screen name='role' component={BlankPage}/>
        <Stack.Screen name='viewerLayout' component={ViewerLayout}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App