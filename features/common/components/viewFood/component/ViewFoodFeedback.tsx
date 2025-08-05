import { View, Pressable, Animated } from 'react-native'
import React, { useRef } from 'react'
import { useRouter } from 'expo-router'
import { MaterialIcons, Ionicons } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'
import Typo from '@/components/common/typo'
import { useFetchFeedbacksByFoodId } from '@/hooks/useQuery/common/useFetchFeedbacksByFoodId'

interface ViewFoodFeedbackProps {
  foodId: string | undefined
}

const ViewFoodFeedback = ({ foodId }: ViewFoodFeedbackProps) => {
  const router = useRouter()
  const scaleAnim = useRef(new Animated.Value(1)).current

  const { data: feedbacks = [], isLoading } = useFetchFeedbacksByFoodId({
    foodId: foodId || '',
    enabled: !!foodId,
  })

  const navigateToViewFeedBack = () => {
    if (!foodId) return

    router.push({
      pathname: '/screens/common/viewFoodFeedback',
      params: { foodId },
    })
  }

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start()
  }

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start()
  }

  const averageRating =
    feedbacks.length > 0
      ? feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0) /
        feedbacks.length
      : 0

  const renderStars = (rating: number) => {
    return (
      <View className="flex-row">
        {[1, 2, 3, 4, 5].map((star) => (
          <Ionicons
            key={star}
            name={star <= rating ? 'star' : 'star-outline'}
            size={14}
            color={star <= rating ? '#F59E0B' : '#D1D5DB'}
          />
        ))}
      </View>
    )
  }

  return (
    <Animated.View
      style={{
        transform: [{ scale: scaleAnim }],
      }}
    >
      <Pressable
        onPress={navigateToViewFeedBack}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        className="mb-4"
      >
        <BlurView intensity={15} className="rounded-2xl overflow-hidden">
          <View className="bg-gradient-to-r from-blue-50/90 to-indigo-50/90 p-4">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-3 flex-1">
                <View className="bg-blue-100 p-2 rounded-full">
                  <MaterialIcons name="feedback" size={20} color="#3B82F6" />
                </View>

                <View className="flex-1">
                  <Typo className="text-blue-800 text-base font-semibold">
                    Customer Reviews
                  </Typo>

                  {isLoading ? (
                    <Typo className="text-blue-600 text-sm">
                      Loading reviews...
                    </Typo>
                  ) : feedbacks.length > 0 ? (
                    <View className="flex-row items-center gap-2 mt-1">
                      {renderStars(Math.round(averageRating))}
                      <Typo className="text-blue-600 text-sm">
                        {averageRating.toFixed(1)} ({feedbacks.length} review
                        {feedbacks.length !== 1 ? 's' : ''})
                      </Typo>
                    </View>
                  ) : (
                    <Typo className="text-blue-600 text-sm">
                      No reviews yet - Be the first!
                    </Typo>
                  )}
                </View>
              </View>

              <View className="bg-blue-200 p-2 rounded-full">
                <Ionicons name="chevron-forward" size={16} color="#3B82F6" />
              </View>
            </View>

            {/* Preview of latest feedback */}
            {feedbacks.length > 0 && (
              <View className="mt-3 pt-3 border-t border-blue-200/50">
                <Typo className="text-blue-700 text-xs italic">
                  "
                  {feedbacks[0].feedback.length > 60
                    ? feedbacks[0].feedback.substring(0, 60) + '...'
                    : feedbacks[0].feedback}
                  "
                </Typo>
              </View>
            )}
          </View>
        </BlurView>
      </Pressable>
    </Animated.View>
  )
}

export default ViewFoodFeedback
