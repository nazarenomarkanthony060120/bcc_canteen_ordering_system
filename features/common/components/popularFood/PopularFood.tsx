import { Text, SafeAreaView, ActivityIndicator } from 'react-native'
import React from 'react'
import FoodList from './component/FoodList'
import { useFetchAllPopularFoods } from '@/hooks/common/useFetchAllPopularFoods'
import Typo from '@/components/common/typo'

const PopularFood = () => {
  const { data: popularFood, isFetching } = useFetchAllPopularFoods()

  console.log(popularFood)
  let content = <ActivityIndicator size="large" color="#0000ff" />
  if (isFetching) {
    content = <ActivityIndicator size="large" color="#0000ff" />
  } else if (popularFood?.length == 0) {
    content = <Typo>No popular food for today!</Typo>
  } else {
    content = <FoodList foods={popularFood} />
  }

  return (
    <SafeAreaView className="gap-3 pb-5">
      <Text className="text-lg font-semibold">Popular Foods</Text>
      {content}
    </SafeAreaView>
  )
}

export default PopularFood
