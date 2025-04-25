import { View, Text } from 'react-native'
import React from 'react'
import { Food } from '@/utils/types'
import Typo from '@/components/common/typo'

interface ViewFoodFormCardProps {
  food: Food | null | undefined
}

const ViewFoodFormCard = ({ food }: ViewFoodFormCardProps) => {
  return (
    <View>
      <Text>ViewFoodFormCard</Text>
      <Typo>{food?.name}</Typo>
    </View>
  )
}

export default ViewFoodFormCard
