import { ScrollView, View, RefreshControl, Animated } from 'react-native'
import React, { useRef, useEffect, useState } from 'react'
import { useAuth } from '@/context/auth'
import ProfileFormCard from './component/ProfileFormCard'
import ProfileFooter from './component/ProfileFooter'
import { useGetUserByUserId } from '@/hooks/useQuery/common/get/useGetUserByUserId'
import { SafeAreaView } from 'react-native-safe-area-context'
import LoadingIndicator from '../loadingIndicator/LoadingIndicator'
import { LinearGradient } from 'expo-linear-gradient'
import { MaterialIcons } from '@expo/vector-icons'
import Typo from '@/components/common/typo'

const Profile = () => {
  const { user } = useAuth()
  const [refreshing, setRefreshing] = useState(false)
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(20)).current

  const {
    data: userData,
    isLoading,
    refetch,
  } = useGetUserByUserId({
    id: user?.uid,
  })

  useEffect(() => {
    if (!isLoading) {
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
    }
  }, [isLoading])

  const onRefresh = async () => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }

  if (isLoading && !refreshing) {
    return (
      <LinearGradient
        colors={['#6a11cb', '#2575fc']}
        style={{ flex: 1 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <SafeAreaView className="flex-1 justify-center items-center">
          <View className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 items-center">
            <View className="bg-white/20 p-4 rounded-full mb-4">
              <MaterialIcons name="person" size={32} color="#FFFFFF" />
            </View>
            <LoadingIndicator />
            <Typo className="text-white text-base mt-4 font-medium">
              Loading profile...
            </Typo>
          </View>
        </SafeAreaView>
      </LinearGradient>
    )
  }

  return (
    <LinearGradient
      colors={['#6a11cb', '#2575fc']}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView className="flex-1 justify-center items-center px-2 w-full">
        <Animated.View
          className="w-full"
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            className="w-full"
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor="#FFFFFF"
                title="Pull to refresh"
                titleColor="#FFFFFF"
              />
            }
          >
            <ProfileFormCard user={userData} />
            <ProfileFooter />
          </ScrollView>
        </Animated.View>
      </SafeAreaView>
    </LinearGradient>
  )
}

export default Profile
