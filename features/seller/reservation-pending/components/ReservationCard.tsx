import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { BlurView } from 'expo-blur'
import { MaterialIcons } from '@expo/vector-icons'
import Typo from '@/components/common/typo'
import { format } from 'date-fns'
import { ReservationOrders } from '@/utils/types'
import { getReservationStatusColor } from '@/features/common/parts/getReservationStatusColor'
import { getReservationStatusIcon } from '@/features/common/parts/getReservationStatusIcon'
import { getReservationStatus } from '@/features/common/parts/getReservationStatus'
import { Timestamp } from 'firebase/firestore'

interface ReservationCardProps {
  reservation: ReservationOrders
  onPress: (id: string) => void
}

const ReservationCard = ({ reservation, onPress }: ReservationCardProps) => {
  const createdAt = reservation.createdAt as Timestamp

  return (
    <TouchableOpacity onPress={() => onPress(reservation.id)}>
      <BlurView intensity={20} className="rounded-3xl overflow-hidden mb-4">
        <View className="bg-white/90 p-4">
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center">
              <View
                className="p-3 rounded-full mr-3"
                style={{
                  backgroundColor: `${getReservationStatusColor(reservation.status)}20`,
                }}
              >
                <MaterialIcons
                  name={getReservationStatusIcon(reservation.status)}
                  size={24}
                  color={getReservationStatusColor(reservation.status)}
                />
              </View>
              <View>
                <Typo className="text-gray-800 font-semibold text-lg">
                  Order #{reservation.id.slice(-6)}
                </Typo>
                <Typo className="text-gray-500">
                  {format(
                    createdAt?.toDate() || new Date(),
                    'MMM d, yyyy h:mm a',
                  )}
                </Typo>
              </View>
            </View>
            <View
              className="px-4 py-2 rounded-full"
              style={{
                backgroundColor: `${getReservationStatusColor(reservation.status)}20`,
              }}
            >
              <Typo
                className="text-sm font-semibold"
                style={{
                  color: getReservationStatusColor(reservation.status),
                }}
              >
                {getReservationStatus(reservation.status)}
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
                  name={reservation.paymentMethod === 'Cash' ? 'payments' : 'credit-card'}
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
  )
}

export default ReservationCard
