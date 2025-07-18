import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import NoKYC from '@/features/seller/store/component/NoKYC'

const KYCScreen = () => {
  const { fromPath } = useLocalSearchParams()
  return <NoKYC onRefresh={() => {}} fromPath={fromPath} />
}

export default KYCScreen
