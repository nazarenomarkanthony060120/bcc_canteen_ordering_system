import React from 'react'
import Seller from '../Seller'
import EditFoodHeader from './component/EditFoodHeader'
import EditFoodFooter from './component/EditFoodFooter'
import EditFoodFormCard from './component/EditFoodFormCard'
import { ScrollView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Typo from '@/components/common/typo'

interface EditFoodProps {
  params: URLSearchParams
}

const EditFood = ({ params }: EditFoodProps) => {
  const storeId = params.get('storeId')
  const foodId = params.get('foodId')

  return (
    <Seller className="flex-1">
      <LinearGradient
        colors={['#F0FDF4', '#FFFFFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="absolute inset-0"
      />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <EditFoodHeader storeId={storeId} />
        <EditFoodFormCard storeId={storeId} foodId={foodId} />
        <EditFoodFooter />
      </ScrollView>
    </Seller>
  )
}

export default EditFood

