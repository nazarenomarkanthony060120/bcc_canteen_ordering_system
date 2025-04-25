import { View, ActivityIndicator, Text } from 'react-native'
import React from 'react'
import { useGetFoodByFoodId } from '@/hooks/useQuery/common/get/useGetFoodByFoodId'
import Typo from '@/components/common/typo'
import ScreenLayout from '../screenLayout/ScreenLayout'
import { SafeAreaView } from 'react-native-safe-area-context'
import ViewFoodHeader from './component/ViewFoodHeader'
import ViewFoodFormCard from './component/ViewFoodFormCard'

interface ViewFoodProps {
  params: URLSearchParams
}

const ViewFood = ({ params }: ViewFoodProps) => {
  const foodId = params.get('foodId')
  const { data: food, isFetching } = useGetFoodByFoodId({ id: foodId })

  let content = <ActivityIndicator size="large" color="#0000ff" />
  if (isFetching) {
    content = (
      <>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#0000ff" />
          <Typo>Loading</Typo>
        </View>
      </>
    )
  } else {
    content = (
      <>
        <ViewFoodHeader />
        <ViewFoodFormCard food={food} />
      </>
    )
  }

  return (
    <ScreenLayout>
      <SafeAreaView className="flex-1 bg-emerald-50">{content}</SafeAreaView>
    </ScreenLayout>
  )
}

export default ViewFood
