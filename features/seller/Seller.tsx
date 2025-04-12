import { View, Text } from 'react-native'
import React from 'react'
import SellerLayout from './common/SellerLayout'

interface SellerProps {
  children: React.ReactNode
  className: string
}

const Seller = ({ children, className }: SellerProps) => {
  return <SellerLayout className={className}>{children}</SellerLayout>
}

export default Seller
