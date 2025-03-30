import { View, Text } from 'react-native'
import React from 'react'
import RegisterBackground from './components/registerBackground/RegisterBackground'
import RegisterController from './components/registerController/RegisterController'

const Register = () => {
  return (
    <View className="h-screen w-full">
      <RegisterBackground />
      <RegisterController />
    </View>
  )
}

export default Register