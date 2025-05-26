import React from 'react'
import { View, ScrollView } from 'react-native'
import { BlurView } from 'expo-blur'
import { MaterialIcons } from '@expo/vector-icons'
import Typo from '@/components/common/typo'
import { format } from 'date-fns'
import { Reservation } from '@/utils/types'
import { getReservationStatusColor } from '@/features/common/parts/getReservationStatusColor'
import { getReservationStatus } from '@/features/common/parts/getReservationStatus'

interface ReservationDetailProps {
  reservation: Reservation
}

const ReservationDetail = ({ reservation }: ReservationDetailProps) => {
  return (
    <ScrollView className="flex-1">
      <View className="p-4">
        {/* Order Header */}
        <BlurView intensity={20} className="rounded-3xl overflow-hidden mb-4">
          <View className="bg-white/90 p-4">
            <View className="flex-row items-center justify-between mb-4">
              <View>
                <Typo className="text-gray-800 font-semibold text-lg">
                  Order #{reservation.id.slice(-6)}
                </Typo>
                <Typo className="text-gray-500">
                  {format(
                    reservation.createdAt?.toDate() || new Date(),
                    'MMM d, yyyy h:mm a',
                  )}
                </Typo>
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
          </View>
        </BlurView>

        {/* Store Information */}
        <BlurView intensity={20} className="rounded-3xl overflow-hidden mb-4">
          <View className="bg-white/90 p-4">
            <View className="flex-row items-center mb-3">
              <View className="bg-emerald-50 p-2 rounded-full mr-3">
                <MaterialIcons name="store" size={24} color="#10B981" />
              </View>
              <View>
                <Typo className="text-gray-800 font-semibold text-lg">
                  BCC Canteen
                </Typo>
                <Typo className="text-gray-500">Main Building</Typo>
              </View>
            </View>
          </View>
        </BlurView>

        {/* Order Items */}
        <BlurView intensity={20} className="rounded-3xl overflow-hidden mb-4">
          <View className="bg-white/90 p-4">
            <Typo className="text-gray-800 font-semibold text-lg mb-4">
              Order Items
            </Typo>
            {reservation.items.map((item, index) => (
              <View
                key={index}
                className="flex-row justify-between items-center mb-3"
              >
                <View className="flex-1">
                  <Typo className="text-gray-800 font-medium">{item.name}</Typo>
                  <Typo className="text-gray-500 text-sm">
                    Quantity: {item.quantity}
                  </Typo>
                </View>
                <Typo className="text-emerald-600 font-semibold">
                  ₱{(item.price * item.quantity).toFixed(2)}
                </Typo>
              </View>
            ))}
            <View className="border-t border-gray-100 pt-3 mt-2">
              <View className="flex-row justify-between">
                <Typo className="text-gray-600">Total Amount</Typo>
                <Typo className="text-emerald-600 font-bold text-lg">
                  ₱{reservation.totalAmount.toFixed(2)}
                </Typo>
              </View>
            </View>
          </View>
        </BlurView>

        {/* Payment Information */}
        <BlurView intensity={20} className="rounded-3xl overflow-hidden">
          <View className="bg-white/90 p-4">
            <Typo className="text-gray-800 font-semibold text-lg mb-3">
              Payment Details
            </Typo>
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <MaterialIcons
                  name={
                    reservation.paymentMethod === 'Pay at Counter'
                      ? 'payments'
                      : 'credit-card'
                  }
                  size={20}
                  color="#6B7280"
                  style={{ marginRight: 8 }}
                />
                <Typo className="text-gray-600">Payment Method</Typo>
              </View>
              <Typo className="text-gray-800 font-medium">
                {reservation.paymentMethod}
              </Typo>
            </View>
          </View>
        </BlurView>
      </View>
    </ScrollView>
  )
}

export default ReservationDetail
