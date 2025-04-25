import { SafeAreaView } from 'react-native'
import React from 'react'
import ProtectedRoutes from '@/components/parts/ProtectedRoutes'

interface SellerLayoutProps {
  children: React.ReactNode
  className: string
}

const SellerLayout = ({ children, className }: SellerLayoutProps) => {
  return (
    <ProtectedRoutes>
      <SafeAreaView className={className}>{children}</SafeAreaView>
    </ProtectedRoutes>
  )
}

export default SellerLayout
