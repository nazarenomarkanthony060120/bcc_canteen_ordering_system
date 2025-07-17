import React from 'react'
import Admin from '../Admin'
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import CreateSellerAccountFormCard from './components/CreateSellerAccountFormCard'

const CreateSellerAccount = () => {
  return (
    <Admin className="flex-1">
      <LinearGradient
        colors={['#F0FDF4', '#FFFFFF']}
        className="flex-1"
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <SafeAreaView className="p-2 mb-5 gap-1 flex-1">
          <CreateSellerAccountFormCard />
        </SafeAreaView>
      </LinearGradient>
    </Admin>
  )
}

export default CreateSellerAccount
