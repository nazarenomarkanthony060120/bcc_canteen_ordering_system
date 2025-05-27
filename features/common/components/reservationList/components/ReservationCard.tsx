import React from 'react'
import { View, Text, Animated } from 'react-native'
import { BlurView } from 'expo-blur'
import { useGetFoodByFoodId } from '@/hooks/useQuery/common/get/useGetFoodByFoodId'
import { useGetStoreByStoreId } from '@/hooks/useQuery/common/get/useGetStoreByStoreId'
import { Reservation } from '@/utils/types'
import LoadingIndicator from '../../loadingIndicator/LoadingIndicator'
import { getFoodReservationStatus } from '@/features/common/parts/getFoodReservationStatus'

interface ReservationCardProps {
  reservation: Reservation
  fadeAnim: Animated.Value
  slideAnim: Animated.Value
  scaleAnim: Animated.Value
}

const getStatusStyle = (status: number) => {
  switch (status) {
    case 0: // Reserved
      return {
        container: 'bg-amber-50 border border-amber-200',
        text: 'text-amber-700',
        dot: 'bg-amber-500',
      }
    case 1: // Pending
      return {
        container: 'bg-indigo-50 border border-indigo-200',
        text: 'text-indigo-700',
        dot: 'bg-indigo-500',
      }
    case 2: // Completed
      return {
        container: 'bg-teal-50 border border-teal-200',
        text: 'text-teal-700',
        dot: 'bg-teal-500',
      }
    case 3: // Cancelled
      return {
        container: 'bg-rose-50 border border-rose-200',
        text: 'text-rose-700',
        dot: 'bg-rose-500',
      }
    default:
      return {
        container: 'bg-slate-50 border border-slate-200',
        text: 'text-slate-700',
        dot: 'bg-slate-500',
      }
  }
}

const StatusBadge = ({ status }: { status: number }) => {
  const styles = getStatusStyle(status)
  const statusText = getFoodReservationStatus(status)

  return (
    <View className={`flex-row items-center px-2.5 py-1 rounded-lg ${styles.container}`}>
      <View className={`w-2 h-2 rounded-full mr-2 ${styles.dot}`} />
      <Text className={`text-sm font-medium ${styles.text}`}>{statusText}</Text>
    </View>
  )
}

const ReservationItem = ({ item }: { item: any }) => {
  const { data: food, isLoading: isLoadingFood } = useGetFoodByFoodId({ id: item.foodId })
  const { data: store, isLoading: isLoadingStore } = useGetStoreByStoreId({ id: food?.storeId })

  if (isLoadingFood || isLoadingStore) {
    return (
      <View className="py-2">
        <LoadingIndicator />
      </View>
    )
  }

  if (!food || !store) {
    return (
      <View className="p-2 bg-red-50 rounded-lg">
        <Text className="text-red-600">Error loading item details</Text>
      </View>
    )
  }

  return (
    <View className="flex-row justify-between items-center py-2 border-b border-gray-100">
      <View className="flex-1">
        <Text className="text-gray-800 font-medium">{food.name}</Text>
        <Text className="text-gray-500 text-sm">{store.store}</Text>
      </View>
      <View className="items-end">
        <Text className="text-gray-800">x{item.quantity}</Text>
        <Text className="text-emerald-600 font-medium">₱{item.totalPrice.toFixed(2)}</Text>
        <StatusBadge status={item.status} />
      </View>
    </View>
  )
}

const ReservationCard: React.FC<ReservationCardProps> = ({
  reservation,
  fadeAnim,
  slideAnim,
  scaleAnim,
}) => {
  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
      }}
      className="mb-4"
    >
      <BlurView intensity={10} className="rounded-3xl overflow-hidden">
        <View className="bg-white/90 p-4">
          <View className="flex-row justify-between items-center mb-4">
            <View>
              <Text className="text-gray-500 text-sm">Order ID</Text>
              <Text className="text-gray-800 font-medium">{reservation.id}</Text>
            </View>
            <StatusBadge status={reservation.status} />
          </View>

          <View className="space-y-2">
            {reservation.items.map((item) => (
              <ReservationItem key={item.id} item={item} />
            ))}
          </View>

          <View className="mt-4 pt-4 border-t border-gray-100">
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-500">Payment Method</Text>
              <Text className="text-gray-800 font-medium">{reservation.paymentMethod}</Text>
            </View>
            <View className="flex-row justify-between items-center mt-2">
              <Text className="text-gray-500">Total Amount</Text>
              <Text className="text-emerald-600 font-bold text-lg">
                ₱{reservation.totalAmount.toFixed(2)}
              </Text>
            </View>
          </View>

          <Text className="text-gray-400 text-xs mt-4">
            {new Date(reservation.createdAt.toDate()).toLocaleString()}
          </Text>
        </View>
      </BlurView>
    </Animated.View>
  )
}

export default ReservationCard
