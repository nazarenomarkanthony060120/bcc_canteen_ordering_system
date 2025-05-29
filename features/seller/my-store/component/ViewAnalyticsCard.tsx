import React, { useRef, useEffect } from 'react'
import { TouchableOpacity, View, Animated, Text, Easing } from 'react-native'
import { BlurView } from 'expo-blur'
import { MaterialIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'

interface ViewAnalyticsCardProps {
  storeId: string | undefined
}

const ViewAnalyticsCard = ({ storeId }: ViewAnalyticsCardProps) => {
  const router = useRouter()
  const applyScaleAnim = useRef(new Animated.Value(1)).current
  const opacityAnim = useRef(new Animated.Value(1)).current
  const rotateAnim = useRef(new Animated.Value(0)).current
  const iconScaleAnim = useRef(new Animated.Value(1)).current

  useEffect(() => {
    // Subtle continuous rotation animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 0,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start()
  }, [])

  const handlePendingStore = () => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(applyScaleAnim, {
          toValue: 0.95,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0.8,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.spring(iconScaleAnim, {
          toValue: 0.8,
          friction: 3,
          tension: 40,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.spring(applyScaleAnim, {
          toValue: 1,
          friction: 3,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(iconScaleAnim, {
          toValue: 1,
          friction: 3,
          tension: 40,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      router.push({
        pathname: '/screens/(seller)/view-analytics/viewAnalytics',
        params: { storeId: storeId }
      })
    })
  }

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  return (
    <Animated.View
      style={{
        transform: [{ scale: applyScaleAnim }],
        opacity: opacityAnim,
      }}
    >
      <BlurView
        intensity={30}
        tint="light"
        className="rounded-2xl overflow-hidden"
      >
        <LinearGradient
          colors={['#4ade80', '#059669', '#047857']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="rounded-2xl"
        >
          <TouchableOpacity
            onPress={handlePendingStore}
            className="flex-row items-center justify-center"
            style={{
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.15,
              shadowRadius: 12,
              elevation: 8,
            }}
          >
            <View className="flex-row items-center gap-4 px-7 py-5">
              <Animated.View
                style={{
                  transform: [
                    { scale: iconScaleAnim }
                  ],
                }}
                className="p-3 rounded-full"
              >
                <MaterialIcons name="insights" size={26} color="#ffffff" />
              </Animated.View>
              <View className="flex-1">
                <View className="flex-row items-center gap-2 mb-1">
                  <Text className="text-xl font-bold text-white">
                    View Analytics
                  </Text>
                </View>
                <View className="flex-row items-center gap-2">
                  <Text className="text-sm text-emerald-100">
                    Track your store performance
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </LinearGradient>
      </BlurView>
    </Animated.View>
  )
}

export default ViewAnalyticsCard

