import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { style } from '../../styles/style'

const MainBtn = ({text}) => {
  return (
   <TouchableOpacity style={style.secondaryBtn}>
     <Text style={style.btnText}>{text}</Text>
   </TouchableOpacity>
  )
}

export default MainBtn