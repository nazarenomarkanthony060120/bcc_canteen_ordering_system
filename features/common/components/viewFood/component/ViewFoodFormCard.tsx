import { View, ScrollView, Animated } from 'react-native'
import React, { useRef, useEffect } from 'react'
import { Food, Store } from '@/utils/types'
import ViewFoodFormHeader from './ViewFoodFormHeader'
import ViewFoodFormContents from './ViewFoodFormContents'
import ViewFoodFormFooter from './ViewFoodFormFooter'
import { BlurView } from 'expo-blur'
import ViewFoodFeedback from './ViewFoodFeedback'

interface ViewFoodFormCardProps {
  food: Food | null | undefined
  store: Store | null | undefined
}

const ViewFoodFormCard = ({ food, store }: ViewFoodFormCardProps) => {
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

  return (
    <ScrollView
      className="flex-1"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <ViewFoodFormHeader food={food} store={store} />
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
      >
        <BlurView
          intensity={20}
          className="flex-1 rounded-t-3xl -mt-6 overflow-hidden"
        >
          <View className="bg-white/95">
            <ViewFoodFormContents food={food} />
            <ViewFoodFeedback foodId={food?.id} />
            <ViewFoodFormFooter food={food} store={store} />
          </View>
        </BlurView>
      </Animated.View>
    </ScrollView>
  )
}

export default ViewFoodFormCard
