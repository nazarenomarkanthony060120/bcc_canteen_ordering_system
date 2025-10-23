import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useFetchNotifications } from '@/hooks/useQuery/notifications/useFetchNotifications'
import { useAuth } from '@/context/auth'

const NotificationBell = () => {
  const auth = useAuth()
  const router = useRouter()
  const { data: notifications = [] } = useFetchNotifications(auth.user?.uid)

  const unreadCount = notifications.filter((n) => !n.read).length

  const handlePress = () => {
    router.push('/screens/common/notifications')
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="relative mr-4"
      activeOpacity={0.7}
    >
      <Ionicons name="notifications-outline" size={28} color="#374151" />
      {unreadCount > 0 && (
        <View className="absolute -top-1 -right-1 bg-red-500 rounded-full min-w-[20px] h-5 items-center justify-center px-1">
          <Text className="text-white text-xs font-bold">
            {unreadCount > 99 ? '99+' : unreadCount}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  )
}

export default NotificationBell

