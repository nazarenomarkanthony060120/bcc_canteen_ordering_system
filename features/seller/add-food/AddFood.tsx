import React from 'react'
import Seller from '../Seller'
import AddFoodHeader from './component/AddFoodHeader'
import AddFoodFooter from './component/AddFoodFooter'
import AddFoodFormCard from './component/AddFoodFormCard'
import { ScrollView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

interface AddFoodProps {
  params: URLSearchParams
}

const AddFood = ({ params }: AddFoodProps) => {
  const storeId = params.get('storeId')

  return (
    <Seller className="flex-1">
      <LinearGradient
        colors={['#F0FDF4', '#FFFFFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="absolute inset-0"
      />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <AddFoodHeader storeId={storeId} />
        <AddFoodFormCard storeId={storeId} />
        <AddFoodFooter />
      </ScrollView>
    </Seller>
  )
}

export default AddFood
