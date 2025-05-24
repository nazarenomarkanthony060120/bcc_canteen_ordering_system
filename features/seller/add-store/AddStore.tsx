import React from 'react'
import { ScrollView, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Seller from '../Seller'
import AddStoreHeader from './component/AddStoreHeader'
import AddStoreFormCard from './component/AddStoreFormCard'

const AddStore = () => {
  return (
    <Seller className="flex-1">
      <LinearGradient
        colors={['#F0FDF4', '#FFFFFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="absolute inset-0"
      />
      <ScrollView 
        showsVerticalScrollIndicator={false}
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="flex-1 px-4 py-6">
          <AddStoreFormCard />
        </View>
      </ScrollView>
    </Seller>
  )
}

export default AddStore
