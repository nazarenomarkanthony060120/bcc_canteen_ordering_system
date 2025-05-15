import { Text } from 'react-native'
import React from 'react'
import NewAddFoodList from './component/NewAddFoodList'
import { SafeAreaView } from 'react-native-safe-area-context'
import Typo from '@/components/common/typo'
import { useFetchNewlyAddedFoods } from '@/hooks/useQuery/common/fetch/useFetchNewlyAddedFoods'
import ScreenLayout from '../screenLayout/ScreenLayout'
import LoadingIndicator from '../loadingIndicator/LoadingIndicator'

const NewlyAddFood = () => {
  const { data: newlyAddedFood, isFetching } = useFetchNewlyAddedFoods()

  if (isFetching) return <LoadingIndicator />
  if (newlyAddedFood?.length == 0) return <Typo>No Newly Food Added!.</Typo>

  return (
    <ScreenLayout>
      <SafeAreaView className="gap-3 mb-28">
        <Text className="text-lg font-bold">Newly Added Foods</Text>
        <NewAddFoodList foods={newlyAddedFood} />
      </SafeAreaView>
    </ScreenLayout>
  )
}

export default NewlyAddFood
