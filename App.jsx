import { StatusBar } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import ViewerLayout from './src/screens/viewers/layout/ViewerLayout'

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar hidden/>
      <ViewerLayout/>
    </NavigationContainer>
  )
}

export default App