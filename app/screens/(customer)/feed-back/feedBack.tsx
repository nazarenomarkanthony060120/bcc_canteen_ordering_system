import React from 'react'
import FeedBack from '@/features/common/components/feedBack/FeedBack'
import { useLocalSearchParams } from 'expo-router'

const FeedBackScreen = () => {
  const { foodId } = useLocalSearchParams()
  return <FeedBack foodId={foodId as string} />
}

export default FeedBackScreen
