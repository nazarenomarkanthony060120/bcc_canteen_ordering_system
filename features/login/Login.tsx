import { View } from 'react-native'
import React from 'react'
import LoginBackground from './components/loginBackground/LoginBackground'
import LoginController from './components/LoginController/LoginController'
import LoginLogoIcon from './components/loginLogoIcon/LoginLogoIcon'

const Login = () => {
  return (
    <View className="h-screen w-full">
      <LoginBackground />
      <LoginLogoIcon />
      <LoginController />
      {/* <LoginProviderIcon /> */}
    </View>
  )
}

export default Login