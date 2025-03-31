import { SafeAreaView } from 'react-native'
import React from 'react'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <SafeAreaView className='flex-1 bg-slate-900'>
      {children}
    </SafeAreaView>
  )
}

export default Layout