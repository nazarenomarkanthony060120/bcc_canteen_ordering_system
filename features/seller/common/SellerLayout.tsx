import { SafeAreaView } from 'react-native'
import React from 'react'

interface SellerLayoutProps {
  children: React.ReactNode
  className: string
}
const SellerLayout = ({ children, className }: SellerLayoutProps) => {
  return <SafeAreaView className={className}>{children}</SafeAreaView>
}

export default SellerLayout
