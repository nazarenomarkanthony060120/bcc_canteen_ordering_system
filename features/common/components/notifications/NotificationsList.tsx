import React from 'react'
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  RefreshControl,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useFetchNotifications } from '@/hooks/useQuery/notifications/useFetchNotifications'
import { useMarkNotificationAsRead } from '@/hooks/useMutation/notifications/useMarkNotificationAsRead'
import { useAuth } from '@/context/auth'
import LoadingIndicator from '../loadingIndicator/LoadingIndicator'
import { Notification } from '@/api/notifications/fetchNotificationsByUserId'
import { formatDistanceToNow } from 'date-fns'

const NotificationsList = () => {
  const auth = useAuth()
  const router = useRouter()
  const { data: notifications = [], isLoading, refetch, isRefetching } = useFetchNotifications(auth.user?.uid)
  const { mutate: markAsRead } = useMarkNotificationAsRead()

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'order_new':
        return <Ionicons name="cart" size={24} color="#10B981" />
      case 'order_ready':
        return <Ionicons name="checkmark-circle" size={24} color="#8B5CF6" />
      case 'order_expired':
        return <Ionicons name="time" size={24} color="#EF4444" />
      case 'order_completed':
        return <Ionicons name="checkmark-done-circle" size={24} color="#3B82F6" />
      case 'order_cancelled':
        return <Ionicons name="close-circle" size={24} color="#EF4444" />
      default:
        return <Ionicons name="information-circle" size={24} color="#6B7280" />
    }
  }

  const handleNotificationPress = (notification: Notification) => {
    if (!notification.read) {
      markAsRead(notification.id)
    }
    
    if (notification.reservationId) {
      // Navigate to order details if needed
      // router.push(`/screens/order-details?id=${notification.reservationId}`)
    }
  }

  if (isLoading) {
    return <LoadingIndicator />
  }

  return (
    <View className="flex-1 bg-gray-50">
      <LinearGradient
        colors={['#F0FDF4', '#FFFFFF']}
        className="absolute inset-0"
      />
      <SafeAreaView className="flex-1">
        {/* Header */}
        <View className="px-4 py-4 bg-white border-b border-gray-200">
          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={() => router.back()}
              className="mr-3"
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-back" size={24} color="#374151" />
            </TouchableOpacity>
            <Text className="text-xl font-bold text-gray-800 flex-1">
              Notifications
            </Text>
            <View className="bg-emerald-100 px-3 py-1 rounded-full">
              <Text className="text-emerald-700 font-semibold">
                {notifications.filter((n) => !n.read).length} new
              </Text>
            </View>
          </View>
        </View>

        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={refetch}
              tintColor="#10B981"
            />
          }
        >
          <View className="p-4">
            {notifications.length === 0 ? (
              <View className="items-center justify-center py-20">
                <Ionicons name="notifications-off-outline" size={64} color="#D1D5DB" />
                <Text className="text-gray-500 mt-4 text-lg">No notifications yet</Text>
              </View>
            ) : (
              notifications.map((notification) => (
                <TouchableOpacity
                  key={notification.id}
                  onPress={() => handleNotificationPress(notification)}
                  activeOpacity={0.7}
                  className="mb-3"
                >
                  <View
                    className={`flex-row p-4 rounded-xl ${
                      notification.read ? 'bg-white' : 'bg-emerald-50'
                    } border ${
                      notification.read ? 'border-gray-200' : 'border-emerald-200'
                    }`}
                  >
                    <View className="mr-3 mt-1">
                      {getNotificationIcon(notification.type)}
                    </View>
                    <View className="flex-1">
                      <Text
                        className={`text-base font-semibold mb-1 ${
                          notification.read ? 'text-gray-700' : 'text-gray-900'
                        }`}
                      >
                        {notification.title}
                      </Text>
                      <Text className="text-gray-600 text-sm mb-2">
                        {notification.message}
                      </Text>
                      <Text className="text-gray-400 text-xs">
                        {notification.createdAt?.toDate
                          ? formatDistanceToNow(notification.createdAt.toDate(), {
                              addSuffix: true,
                            })
                          : 'Just now'}
                      </Text>
                    </View>
                    {!notification.read && (
                      <View className="ml-2">
                        <View className="w-3 h-3 bg-emerald-500 rounded-full" />
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              ))
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

export default NotificationsList

