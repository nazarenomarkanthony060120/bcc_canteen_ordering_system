import React, { useRef } from 'react'
import { SafeAreaView, View, Animated, Pressable } from 'react-native'
import Typo from '@/components/common/typo'
import { useAuth } from '@/context/auth'
import { MaterialIcons } from '@expo/vector-icons'

const ProfileFooter = () => {
  const { logout } = useAuth()
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<Error | null>(null)
  const scaleAnim = useRef(new Animated.Value(1)).current

  const onSubmit = async () => {
    setIsLoading(true)
    try {
      await logout?.()
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'))
    } finally {
      setIsLoading(false)
    }
  }

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
      speed: 50,
      bounciness: 10,
    }).start()
  }

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 10,
    }).start()
  }

  return (
    <SafeAreaView className="w-full items-center mb-8 mt-2 px-2">
      <Animated.View
        style={{
          width: '100%',
          maxWidth: 400,
          transform: [{ scale: scaleAnim }],
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.18,
          shadowRadius: 8,
          elevation: 6,
        }}
      >
        <Pressable
          onPress={onSubmit}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          disabled={isLoading}
        >
          <View className="flex-row items-center justify-center py-4 px-2 bg-white/20 rounded-2xl">
            <View className="bg-white/30 rounded-full p-1 mr-2">
              <MaterialIcons name="logout" size={22} color="#fff" />
            </View>
            <Typo className="text-white font-bold text-base">Sign Out</Typo>
          </View>
        </Pressable>
      </Animated.View>
      {error && <Typo className="text-red mt-2">{error.message}</Typo>}
    </SafeAreaView>
  )
}

export default ProfileFooter
