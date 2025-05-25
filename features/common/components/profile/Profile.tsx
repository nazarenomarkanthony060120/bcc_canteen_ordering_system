import { ScrollView, RefreshControl, Animated } from 'react-native'
import React, { useRef, useEffect, useState } from 'react'
import { useAuth } from '@/context/auth'
import ProfileFormCard from './component/ProfileFormCard'
import ProfileFooter from './component/ProfileFooter'
import { useGetUserByUserId } from '@/hooks/useQuery/common/get/useGetUserByUserId'
import { SafeAreaView } from 'react-native-safe-area-context'
import LoadingIndicator from '../loadingIndicator/LoadingIndicator'
import { LinearGradient } from 'expo-linear-gradient'

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

  if (isLoading && !refreshing) return <LoadingIndicator />

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
