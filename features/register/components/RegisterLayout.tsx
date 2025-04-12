import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import RegisterBackground from './RegisterBackground'
import RegisterHeader from './RegisterHeader'
import RegisterFooter from './RegisterFooter'

interface RegisterLayoutProps {
  children: React.ReactNode
  className: string
}

const RegisterLayout = ({ children, className }: RegisterLayoutProps) => {
  return (
    <SafeAreaView className={className}>
      <RegisterBackground />
      <RegisterHeader />
      {children}
      <RegisterFooter />
    </SafeAreaView>
  )
}

export default RegisterLayout
