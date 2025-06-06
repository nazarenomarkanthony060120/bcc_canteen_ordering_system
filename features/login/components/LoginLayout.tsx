import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import LoginBackground from './LoginBackground'
import LoginHeader from './LoginHeader'
import LoginFooter from './LoginFooter'

interface LoginLayoutProps {
  children: React.ReactNode
  className: string
}

const LoginLayout = ({ children, className }: LoginLayoutProps) => {
  return (
    <SafeAreaView className={className}>
      <LoginBackground />
      <LoginHeader />
      {children}
      <LoginFooter />
    </SafeAreaView>
  )
}

export default LoginLayout
