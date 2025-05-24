import React, { useRef, useEffect } from 'react'
import {
  View,
  Animated,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import Typo from '@/components/common/typo'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { BlurView } from 'expo-blur'
import {
  FieldValues,
  SubmitHandler,
  UseFormHandleSubmit,
} from 'react-hook-form'

interface AddStoreFormFooterProps {
  onSubmit: SubmitHandler<FieldValues>
  isLoading: boolean
  handleSubmit: UseFormHandleSubmit<FieldValues, FieldValues>
  isCreate: boolean
}

const AddStoreFormFooter = ({
  onSubmit,
  handleSubmit,
  isCreate,
  isLoading,
}: AddStoreFormFooterProps) => {
  const scaleAnim = useRef(new Animated.Value(1)).current
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(20)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  return (
    <View className="mt-8">
      <Animated.View
        style={{
          transform: [{ scale: scaleAnim }, { translateY: slideAnim }],
          opacity: fadeAnim,
        }}
      >
        <BlurView
          intensity={20}
          tint="light"
          className="rounded-2xl overflow-hidden"
        >
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            disabled={isLoading}
            activeOpacity={0.9}
            className="overflow-hidden rounded-2xl shadow-lg border border-white/30"
          >
            <LinearGradient
              colors={['#10B981', '#059669']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="p-5"
            >
              <View className="flex-row items-center justify-center gap-4">
                <View className="bg-white/20 p-3 rounded-xl">
                  {isLoading ? (
                    <ActivityIndicator color="white" size="small" />
                  ) : (
                    <Ionicons name="storefront" size={24} color="white" />
                  )}
                </View>
                <View className="flex-1">
                  <Typo className="text-white font-semibold text-lg">
                    {isLoading ? 'Creating Your Store...' : 'Create Your Store'}
                  </Typo>
                  <Typo className="text-white/80 text-sm mt-0.5">
                    {isLoading
                      ? 'Setting up your business profile and storefront'
                      : 'Launch your business with our powerful platform'}
                  </Typo>
                </View>
                {!isLoading && (
                  <View className="bg-white/20 p-2.5 rounded-xl">
                    <Ionicons name="arrow-forward" size={20} color="white" />
                  </View>
                )}
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </BlurView>
      </Animated.View>
    </View>
  )
}

export default AddStoreFormFooter
