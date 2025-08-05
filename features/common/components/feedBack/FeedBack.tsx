import {
  View,
  ScrollView,
  TouchableOpacity,
  Animated,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BlurView } from 'expo-blur'
import { MaterialIcons, Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import ScreenLayout from '../screenLayout/ScreenLayout'
import Typo from '@/components/common/typo'
import Input from '@/components/common/input'
import Button from '@/components/common/button'
import { useAuth } from '@/context/auth'
import { useSubmitFeedback } from '@/hooks/useMutation/common/useSubmitFeedback'

interface FeedBackProps {
  foodId: string
}

const FeedBack = ({ foodId }: FeedBackProps) => {
  const router = useRouter()
  const { user } = useAuth()
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState('')
  const submitFeedbackMutation = useSubmitFeedback()

  // Animation refs
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(20)).current
  const scaleAnims = useRef(
    Array.from({ length: 5 }, () => new Animated.Value(1)),
  ).current

  useEffect(() => {
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
  }, [])

  const animateStar = (index: number) => {
    Animated.sequence([
      Animated.timing(scaleAnims[index], {
        toValue: 1.3,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnims[index], {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start()
  }

  const handleStarPress = (selectedRating: number) => {
    setRating(selectedRating)
    animateStar(selectedRating - 1)
  }

  const handleSubmit = async () => {
    if (!user?.uid) {
      Alert.alert('Authentication Error', 'Please log in to submit feedback.')
      return
    }

    if (rating === 0) {
      Alert.alert(
        'Rating Required',
        'Please provide a rating before submitting.',
      )
      return
    }

    if (feedback.trim().length < 10) {
      Alert.alert(
        'Feedback Required',
        'Please provide at least 10 characters of feedback.',
      )
      return
    }

    try {
      await submitFeedbackMutation.mutateAsync({
        foodId,
        userId: user.uid,
        rating,
        feedback: feedback.trim(),
      })

      Alert.alert(
        'Thank You!',
        'Your feedback has been submitted successfully.',
        [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ],
      )
    } catch (error) {
      console.error('Error submitting feedback:', error)
      Alert.alert('Error', 'Failed to submit feedback. Please try again.')
    }
  }

  const renderStars = () => {
    return (
      <View className="flex-row justify-center gap-2 mb-6">
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => handleStarPress(star)}
            className="p-2"
          >
            <Animated.View
              style={{
                transform: [{ scale: scaleAnims[star - 1] }],
              }}
            >
              <Ionicons
                name={star <= rating ? 'star' : 'star-outline'}
                size={32}
                color={star <= rating ? '#F59E0B' : '#D1D5DB'}
              />
            </Animated.View>
          </TouchableOpacity>
        ))}
      </View>
    )
  }

  const getRatingText = () => {
    switch (rating) {
      case 1:
        return 'Poor'
      case 2:
        return 'Fair'
      case 3:
        return 'Good'
      case 4:
        return 'Very Good'
      case 5:
        return 'Excellent'
      default:
        return 'Tap to rate'
    }
  }

  return (
    <ScreenLayout>
      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 py-4">
            <TouchableOpacity
              onPress={() => router.back()}
              className="bg-gray-100 p-3 rounded-full"
            >
              <Ionicons name="arrow-back" size={24} color="#374151" />
            </TouchableOpacity>

            <Typo className="text-gray-800 text-xl font-bold">
              Food Feedback
            </Typo>

            <View className="w-12" />
          </View>

          <ScrollView
            className="flex-1"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 40 }}
          >
            <Animated.View
              style={{
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              }}
              className="px-6"
            >
              {/* Main Card */}
              <BlurView
                intensity={20}
                className="rounded-3xl overflow-hidden mb-6"
              >
                <View className="bg-white/95 p-6">
                  {/* Icon */}
                  <View className="items-center mb-6">
                    <View className="bg-amber-50 p-4 rounded-full mb-4">
                      <MaterialIcons
                        name="restaurant"
                        size={40}
                        color="#F59E0B"
                      />
                    </View>
                    <Typo className="text-gray-800 text-2xl font-bold text-center">
                      Rate Your Experience
                    </Typo>
                    <Typo className="text-gray-600 text-base text-center mt-2">
                      Help us improve our food quality
                    </Typo>
                  </View>

                  {/* Star Rating */}
                  <View className="mb-6">
                    <View className="flex-row items-center gap-2 mb-4">
                      <View className="bg-amber-50 p-2 rounded-full">
                        <MaterialIcons name="star" size={20} color="#F59E0B" />
                      </View>
                      <Typo className="text-gray-700 text-lg font-semibold">
                        Rating
                      </Typo>
                    </View>

                    {renderStars()}

                    <Typo className="text-center text-lg font-medium text-amber-600">
                      {getRatingText()}
                    </Typo>
                  </View>

                  {/* Feedback Input */}
                  <View className="mb-6">
                    <View className="flex-row items-center gap-2 mb-4">
                      <View className="bg-emerald-50 p-2 rounded-full">
                        <MaterialIcons
                          name="feedback"
                          size={20}
                          color="#10B981"
                        />
                      </View>
                      <Typo className="text-gray-700 text-lg font-semibold">
                        Your Feedback
                      </Typo>
                    </View>

                    <Input
                      className="w-full py-3 placeholder:text-gray-400 text-base"
                      placeholder="Share your thoughts about this food item..."
                      value={feedback}
                      onChangeText={setFeedback}
                      multiline
                      numberOfLines={4}
                      isIconLeft={false}
                    />

                    <Typo className="text-gray-500 text-sm mt-2">
                      Minimum 10 characters required
                    </Typo>
                  </View>

                  {/* Submit Button */}
                  <Button
                    onPress={handleSubmit}
                    loading={submitFeedbackMutation.isPending}
                    className="bg-emerald-500 py-4 px-6 rounded-2xl items-center justify-center"
                    disabled={submitFeedbackMutation.isPending}
                  >
                    <Typo className="text-white text-lg font-semibold">
                      {submitFeedbackMutation.isPending
                        ? 'Submitting...'
                        : 'Submit Feedback'}
                    </Typo>
                  </Button>
                </View>
              </BlurView>

              {/* Additional Info Card */}
              <BlurView intensity={15} className="rounded-2xl overflow-hidden">
                <View className="bg-blue-50/80 p-4">
                  <View className="flex-row items-center gap-3">
                    <View className="bg-blue-100 p-2 rounded-full">
                      <Ionicons
                        name="information-circle"
                        size={20}
                        color="#3B82F6"
                      />
                    </View>
                    <View className="flex-1">
                      <Typo className="text-blue-800 text-sm font-medium">
                        Your feedback helps us improve
                      </Typo>
                      <Typo className="text-blue-600 text-xs mt-1">
                        All feedback is anonymous and helps our kitchen team
                        enhance the quality of our food.
                      </Typo>
                    </View>
                  </View>
                </View>
              </BlurView>
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ScreenLayout>
  )
}

export default FeedBack
