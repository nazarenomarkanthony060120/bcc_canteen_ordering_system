import React, { useRef, useEffect } from 'react'
import { useGetFoodByFoodId } from '@/hooks/useQuery/common/get/useGetFoodByFoodId'
import ScreenLayout from '../screenLayout/ScreenLayout'
import { SafeAreaView } from 'react-native-safe-area-context'
import ViewFoodHeader from './component/ViewFoodHeader'
import ViewFoodFormCard from './component/ViewFoodFormCard'
import { useGetStoreByStoreId } from '@/hooks/useQuery/common/get/useGetStoreByStoreId'
import LoadingIndicator from '../loadingIndicator/LoadingIndicator'
import { Animated } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

interface ViewFoodProps {
  params: URLSearchParams
}

const ViewFood = ({ params }: ViewFoodProps) => {
  const foodId = params.get('foodId')
  const { data: food } = useGetFoodByFoodId({ id: foodId })
  const { data: store, isFetching } = useGetStoreByStoreId({
    id: food?.storeId,
  })

  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(20)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  if (isFetching) return <LoadingIndicator />

  return (
    <ScreenLayout>
      <LinearGradient
        colors={['#E0F2FE', '#F0F9FF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="flex-1"
      >
        <SafeAreaView className="flex-1">
          <ViewFoodHeader />
          <Animated.View
            className="flex-1"
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
          >
            <ViewFoodFormCard food={food} store={store} />
          </Animated.View>
        </SafeAreaView>
      </LinearGradient>
    </ScreenLayout>
  )
}

export default ViewFood
