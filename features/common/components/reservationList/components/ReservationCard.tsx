import React from 'react'
import { View, Animated, TouchableOpacity } from 'react-native'
import { BlurView } from 'expo-blur'
import { MaterialIcons } from '@expo/vector-icons'
import Typo from '@/components/common/typo'
import { format } from 'date-fns'
import { useRouter } from 'expo-router'
import { Reservation } from '@/utils/types'

interface ReservationCardProps {
  reservation: Reservation
  fadeAnim: Animated.Value
  slideAnim: Animated.Value
  scaleAnim: Animated.Value
}

const ReservationCard = ({ reservation, fadeAnim, slideAnim, scaleAnim }: ReservationCardProps) => {
  const router = useRouter()

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'reserved':
        return '#10B981'
      case 'completed':
        return '#3B82F6'
      case 'cancelled':
        return '#EF4444'
      default:
        return '#6B7280'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'reserved':
        return 'hourglass-top'
      case 'completed':
        return 'check-circle'
      case 'cancelled':
        return 'cancel'
      default:
        return 'help'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'reserved':
        return 'Waiting for Pickup'
      case 'completed':
        return 'Order Completed'
      case 'cancelled':
        return 'Order Cancelled'
      default:
        return 'Unknown Status'
    }
  }

  const handlePress = () => {
    router.push({
      pathname: '/(common)/reservationDetail',
      params: { id: reservation.id }
    })
  }

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [
          { translateY: slideAnim },
          { scale: scaleAnim }
        ],
      }}
    >
      <TouchableOpacity onPress={handlePress}>
        <BlurView
          intensity={20}
          className="rounded-3xl overflow-hidden mb-4"
        >
          <View className="bg-white/90 p-4">
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-row items-center">
                <View
                  className="p-3 rounded-full mr-3"
                  style={{ backgroundColor: `${getStatusColor(reservation.status)}20` }}
                >
                  <MaterialIcons
                    name={getStatusIcon(reservation.status)}
                    size={24}
                    color={getStatusColor(reservation.status)}
                  />
                </View>
                <View>
                  <Typo className="text-gray-800 font-semibold text-lg">
                    Order #{reservation.id.slice(-6)}
                  </Typo>
                  <Typo className="text-gray-500">
                    {format(reservation.createdAt?.toDate() || new Date(), 'MMM d, yyyy h:mm a')}
                  </Typo>
                </View>
              </View>
              <View
                className="px-4 py-2 rounded-full"
                style={{ backgroundColor: `${getStatusColor(reservation.status)}20` }}
              >
                <Typo
                  className="text-sm font-semibold"
                  style={{ color: getStatusColor(reservation.status) }}
                >
                  {getStatusText(reservation.status)}
                </Typo>
              </View>
            </View>

            <View className="border-t border-gray-100 pt-4">
              <View className="flex-row justify-between mb-3">
                <Typo className="text-gray-600">Items</Typo>
                <Typo className="text-gray-800 font-semibold">
                  {reservation.items.length} items
                </Typo>
              </View>
              <View className="flex-row justify-between mb-3">
                <Typo className="text-gray-600">Total Amount</Typo>
                <Typo className="text-emerald-600 font-bold text-lg">
                  ₱{reservation.totalAmount.toFixed(2)}
                </Typo>
              </View>
              <View className="flex-row justify-between">
                <Typo className="text-gray-600">Payment Method</Typo>
                <View className="flex-row items-center">
                  <MaterialIcons
                    name={reservation.paymentMethod === 'Pay at Counter' ? 'payments' : 'credit-card'}
                    size={16}
                    color="#6B7280"
                    style={{ marginRight: 4 }}
                  />
                  <Typo className="text-gray-800 font-medium">
                    {reservation.paymentMethod}
                  </Typo>
                </View>
              </View>
            </View>
          </View>
        </BlurView>
      </TouchableOpacity>
    </Animated.View>
  )
}

export default ReservationCard 