import { SafeAreaView } from 'react-native'
import React from 'react'
import ScreenLayout from '@/features/common/components/screenLayout/ScreenLayout'

interface SellerLayoutProps {
  children: React.ReactNode
  className: string
}

const SellerLayout = ({ children, className }: SellerLayoutProps) => {
  return (
    <ScreenLayout>
      <SafeAreaView className={className}>{children}</SafeAreaView>
    </ScreenLayout>
  )
}

export default SellerLayout
