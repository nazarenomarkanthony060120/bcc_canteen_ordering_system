import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import NewAddFoodList from './component/NewAddFoodList'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFetchNewlyAddedFoods } from '@/hooks/common/useQuery/useFetchNewlyAddedFoods'
import Typo from '@/components/common/typo'

const NewlyAddFood = () => {
  const { data: newlyAddedFood, isFetching } = useFetchNewlyAddedFoods()

  let content = <ActivityIndicator size="large" color="#0000ff" />
  if (isFetching) {
    content = <ActivityIndicator size="large" color="#0000ff" />
  } else if (newlyAddedFood?.length == 0) {
    content = <Typo>No Newly Food Added!.</Typo>
  } else {
    content = <NewAddFoodList foods={newlyAddedFood} />
  }

  return (
    <SafeAreaView className="gap-3 mb-28">
      <Text className="text-lg font-bold">Newly Added Foods</Text>
      {content}
    </SafeAreaView>
  )
}

export default NewlyAddFood
