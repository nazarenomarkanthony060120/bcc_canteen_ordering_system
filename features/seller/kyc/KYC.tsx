import React from 'react'
import KYCHeader from './component/KYCHeader'
import Seller from '../Seller'
import KYCFormCard from './component/KYCFormCard'
import KYCFooter from './component/KYCFooter'
import { View, ScrollView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

const KYC = () => {
  return (
    <Seller className="flex-1">
      <LinearGradient
        colors={['#dcfce7', '#bbf7d0', '#f0fdf4']}
        className="flex-1"
      >
        <ScrollView 
          showsVerticalScrollIndicator={false}
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View className="flex-1 px-4 py-6">
            <KYCHeader />
            <View className="flex-1 mt-4">
              <KYCFormCard />
            </View>
            <KYCFooter />
          </View>
        </ScrollView>
      </LinearGradient>
    </Seller>
  )
}

export default KYC
