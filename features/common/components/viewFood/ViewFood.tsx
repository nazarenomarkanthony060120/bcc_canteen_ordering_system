import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { useGetFoodByFoodId } from '@/hooks/useQuery/common/get/useGetFoodByFoodId'
import Typo from '@/components/common/typo'

interface ViewFoodProps {
  params: URLSearchParams
}

const ViewFood = ({ params }: ViewFoodProps) => {
  const foodId = params.get('foodId')
  const { data: food, isFetching } = useGetFoodByFoodId({ id: foodId })

  let content = <ActivityIndicator size="large" color="#0000ff" />
  if (isFetching) {
    content = <ActivityIndicator size="large" color="#0000ff" />
  } else {
    content = (
      <View>
        <Typo>{food?.name}</Typo>
      </View>
    )
  }

  return <View>{content}</View>
}

export default ViewFood
