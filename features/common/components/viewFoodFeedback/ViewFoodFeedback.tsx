import {
  View,
  ScrollView,
  TouchableOpacity,
  Animated,
  RefreshControl,
} from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BlurView } from 'expo-blur'
import { MaterialIcons, Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import ScreenLayout from '../screenLayout/ScreenLayout'
import Typo from '@/components/common/typo'
import LoadingIndicator from '../loadingIndicator/LoadingIndicator'
import { useFetchFeedbacksByFoodId } from '@/hooks/useQuery/common/useFetchFeedbacksByFoodId'
import { getFoodByFoodId } from '@/api/common/getFoodByFoodId'
import { useQuery } from '@tanstack/react-query'
import { FeedBack } from '@/utils/types'

interface ViewFoodFeedbackProps {
  foodId: string
}

interface FeedbackItemProps {
  feedback: FeedBack
  index: number
}

const FeedbackItem = ({ feedback, index }: FeedbackItemProps) => {
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(20)).current

  useEffect(() => {
    const delay = index * 100
    setTimeout(() => {
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
    }, delay)
  }, [index])

  const renderStars = (rating: number) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating ? '⭐' : '☆')
    }
    return (
      <Typo className="text-lg">
        {stars.join('')} ({rating}/5)
      </Typo>
    )
  }

  const formatDate = (createdAt: any) => {
    if (!createdAt) return 'Unknown date'

    let date: Date
    if (createdAt.toDate) {
      // Firestore Timestamp
      date = createdAt.toDate()
    } else if (createdAt.seconds) {
      // Firestore Timestamp object
      date = new Date(createdAt.seconds * 1000)
    } else {
      // Regular date
      date = new Date(createdAt)
    }

    const now = new Date()
    const diffTime = now.getTime() - date.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return '1 day ago'
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`
    if (diffDays < 365) return `${Math.ceil(diffDays / 30)} months ago`
    return `${Math.ceil(diffDays / 365)} years ago`
  }

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
      }}
      className="mb-4"
    >
      <BlurView intensity={15} className="rounded-2xl overflow-hidden">
        <View className="bg-white/95 p-4">
          <View className="flex-row items-start gap-3">
            <View className="bg-amber-50 p-2 rounded-full">
              <Ionicons name="person" size={20} color="#F59E0B" />
            </View>

            <View className="flex-1">
              <View className="mb-2">
                <Typo className="text-gray-800 text-start w-full text-base mb-1">
                  Order ID: {feedback.id.slice(-4)} → Status: Completed
                </Typo>
                <View className="flex-row items-center justify-between">
                  <Typo className="text-gray-700 text-base">
                    → Rating: {renderStars(feedback.rating)}
                  </Typo>
                </View>
                <Typo className="text-gray-500 text-xs">
                  {formatDate(feedback.createdAt)}
                </Typo>
              </View>

              {feedback.feedback && (
                <Typo className="text-gray-600 text-sm leading-5 mt-2">
                  "{feedback.feedback}"
                </Typo>
              )}
            </View>
          </View>
        </View>
      </BlurView>
    </Animated.View>
  )
}

const ViewFoodFeedback = ({ foodId }: ViewFoodFeedbackProps) => {
  const router = useRouter()
  const [refreshing, setRefreshing] = useState(false)
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(20)).current

  const {
    data: feedbacks = [],
    isLoading: isFeedbacksLoading,
    refetch: refetchFeedbacks,
  } = useFetchFeedbacksByFoodId({
    foodId,
    enabled: !!foodId,
  })

  const {
    data: food,
    isLoading: isFoodLoading,
    refetch: refetchFood,
  } = useQuery({
    queryKey: ['getFoodByFoodId', foodId],
    queryFn: () => getFoodByFoodId({ id: foodId }),
    enabled: !!foodId,
  })

  useEffect(() => {
    if (!isFeedbacksLoading && !isFoodLoading) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start()
    }
  }, [isFeedbacksLoading, isFoodLoading])

  const onRefresh = async () => {
    setRefreshing(true)
    try {
      await Promise.all([refetchFeedbacks(), refetchFood()])
    } catch (error) {
      console.error('Error refreshing data:', error)
    } finally {
      setRefreshing(false)
    }
  }

  const averageRating =
    feedbacks.length > 0
      ? feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0) /
        feedbacks.length
      : 0

  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: feedbacks.filter((f) => f.rating === rating).length,
    percentage:
      feedbacks.length > 0
        ? (feedbacks.filter((f) => f.rating === rating).length /
            feedbacks.length) *
          100
        : 0,
  }))

  const renderStarsOverview = (rating: number, size: number = 20) => {
    return (
      <View className="flex-row">
        {[1, 2, 3, 4, 5].map((star) => (
          <Ionicons
            key={star}
            name={star <= rating ? 'star' : 'star-outline'}
            size={size}
            color={star <= rating ? '#F59E0B' : '#D1D5DB'}
          />
        ))}
      </View>
    )
  }

  if (isFeedbacksLoading || isFoodLoading) {
    return <LoadingIndicator />
  }

  return (
    <ScreenLayout>
      <SafeAreaView className="flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between px-6 py-4">
          <TouchableOpacity
            onPress={() => router.back()}
            className="bg-gray-100 p-3 rounded-full"
          >
            <Ionicons name="arrow-back" size={24} color="#374151" />
          </TouchableOpacity>

          <Typo className="text-gray-800 text-xl font-bold">
            Completed Orders
          </Typo>

          <View className="w-12" />
        </View>

        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#10B981"
            />
          }
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
            className="px-6"
          >
            {/* Food Info Card */}
            {food && (
              <BlurView
                intensity={20}
                className="rounded-3xl overflow-hidden mb-6"
              >
                <View className="bg-white/95 p-6">
                  <View className="flex-row items-center gap-3 mb-4">
                    <View className="bg-emerald-50 p-3 rounded-full">
                      <MaterialIcons
                        name="restaurant"
                        size={24}
                        color="#10B981"
                      />
                    </View>
                    <View className="flex-1">
                      <Typo className="text-gray-800 text-lg font-bold">
                        {food.name}
                      </Typo>
                      <Typo className="text-gray-600 text-sm">
                        Reviews for this item
                      </Typo>
                    </View>
                  </View>
                </View>
              </BlurView>
            )}

            {/* Rating Summary */}
            {feedbacks.length > 0 && (
              <BlurView
                intensity={20}
                className="rounded-3xl overflow-hidden mb-6"
              >
                <View className="bg-white/95 p-6">
                  <View className="flex-row items-center gap-3 mb-4">
                    <View className="bg-amber-50 p-3 rounded-full">
                      <MaterialIcons name="star" size={24} color="#F59E0B" />
                    </View>
                    <Typo className="text-gray-800 text-lg font-bold">
                      Rating Overview
                    </Typo>
                  </View>

                  <View className="flex-row items-center gap-4 mb-6">
                    <View className="items-center">
                      <Typo className="text-4xl font-bold text-amber-600">
                        {averageRating.toFixed(1)}
                      </Typo>
                      {renderStarsOverview(Math.round(averageRating), 16)}
                      <Typo className="text-gray-600 text-sm mt-1">
                        {feedbacks.length} review
                        {feedbacks.length !== 1 ? 's' : ''}
                      </Typo>
                    </View>

                    <View className="flex-1 ml-4">
                      {ratingDistribution.map(
                        ({ rating, count, percentage }) => (
                          <View
                            key={rating}
                            className="flex-row items-center gap-2 mb-1"
                          >
                            <Typo className="text-gray-600 text-sm w-2">
                              {rating}
                            </Typo>
                            <Ionicons name="star" size={12} color="#F59E0B" />
                            <View className="flex-1 bg-gray-200 rounded-full h-2 ml-2">
                              <View
                                className="bg-amber-400 h-2 rounded-full"
                                style={{ width: `${percentage}%` }}
                              />
                            </View>
                            <Typo className="text-gray-600 text-xs w-8 text-right">
                              {count}
                            </Typo>
                          </View>
                        ),
                      )}
                    </View>
                  </View>
                </View>
              </BlurView>
            )}

            {/* Reviews List */}
            {feedbacks.length > 0 ? (
              <View>
                <View className="flex-row items-center gap-2 mb-4">
                  <View className="bg-blue-50 p-2 rounded-full">
                    <MaterialIcons
                      name="rate-review"
                      size={20}
                      color="#3B82F6"
                    />
                  </View>
                  <Typo className="text-gray-800 text-lg font-bold">
                    Completed Orders ({feedbacks.length})
                  </Typo>
                </View>

                {feedbacks.map((feedback, index) => (
                  <FeedbackItem
                    key={feedback.id}
                    feedback={feedback}
                    index={index}
                  />
                ))}
              </View>
            ) : (
              /* Empty State */
              <BlurView intensity={15} className="rounded-3xl overflow-hidden">
                <View className="bg-gray-50/90 p-8 items-center">
                  <View className="bg-gray-100 p-4 rounded-full mb-4">
                    <MaterialIcons
                      name="rate-review"
                      size={40}
                      color="#9CA3AF"
                    />
                  </View>
                  <Typo className="text-gray-800 text-xl font-bold text-center mb-2">
                    No Reviews Yet
                  </Typo>
                  <Typo className="text-gray-600 text-center leading-6">
                    This food item hasn't received any reviews yet. Be the first
                    to share your experience!
                  </Typo>
                </View>
              </BlurView>
            )}
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </ScreenLayout>
  )
}

export default ViewFoodFeedback
