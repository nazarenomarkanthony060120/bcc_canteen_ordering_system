import React from 'react'
import ViewFoodFeedback from '@/features/common/components/viewFoodFeedback/ViewFoodFeedback'
import { useLocalSearchParams } from 'expo-router'

const ViewFoodFeedBackScreen = () => {
  const { foodId } = useLocalSearchParams()
  return <ViewFoodFeedback foodId={foodId as string} />
}

export default ViewFoodFeedBackScreen
