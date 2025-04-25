import { Text, SafeAreaView, ActivityIndicator } from 'react-native'
import React from 'react'
import FoodList from './component/FoodList'
import Typo from '@/components/common/typo'
import { useFetchAllPopularFoods } from '@/hooks/useQuery/common/fetch/useFetchAllPopularFoods'
import ScreenLayout from '../screenLayout/ScreenLayout'

const PopularFood = () => {
  const { data: popularFood, isFetching } = useFetchAllPopularFoods()

  let content = <ActivityIndicator size="large" color="#0000ff" />
  if (isFetching) {
    content = <ActivityIndicator size="large" color="#0000ff" />
  } else if (popularFood?.length == 0) {
    content = <Typo>No popular food for today!</Typo>
  } else {
    content = <FoodList foods={popularFood} />
  }

  return (
    <ScreenLayout>
      <SafeAreaView className="gap-3 pb-5">
        <Text className="text-lg font-semibold">Popular Foods</Text>
        {content}
      </SafeAreaView>
    </ScreenLayout>
  )
}

export default PopularFood
