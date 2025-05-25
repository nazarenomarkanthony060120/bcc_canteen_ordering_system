import React, { useRef, useEffect, useState } from 'react'
import { View, ScrollView, RefreshControl, TouchableOpacity, Animated } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { BlurView } from 'expo-blur'
import { MaterialIcons } from '@expo/vector-icons'
import Typo from '@/components/common/typo'
import ScreenLayout from '../screenLayout/ScreenLayout'
import { useAuth } from '@/context/auth'
import { useRouter } from 'expo-router'
import LoadingIndicator from '../loadingIndicator/LoadingIndicator'
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore'
import { db } from '@/lib/firestore'
import { format } from 'date-fns'

interface Reservation {
  id: string
  items: any[]
  totalAmount: number
  status: string
  createdAt: any
  paymentMethod: string
}

const ReservationList = () => {
  const router = useRouter()
  const auth = useAuth()
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(20)).current

  const fetchReservations = async () => {
    try {
      const q = query(
        collection(db, 'reserved_orders'),
        where('userId', '==', auth.user?.uid),
        orderBy('createdAt', 'desc')
      )
      const querySnapshot = await getDocs(q)
      const reservationData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Reservation[]
      setReservations(reservationData)
    } catch (error) {
      console.error('Error fetching reservations:', error)
    } finally {
      setIsLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchReservations()
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
  }, [])

  const onRefresh = () => {
    setRefreshing(true)
    fetchReservations()
  }

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

  if (isLoading) return <LoadingIndicator />

  return (
    <ScreenLayout>
      <LinearGradient
        colors={['#F0FDF4', '#FFFFFF']}
        className="flex-1"
      />
      <SafeAreaView className="flex-1">
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
          className="flex-1"
        >
          <ScrollView
            className="flex-1"
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor="#10B981"
              />
            }
          >
            <View className="p-4">
              <BlurView intensity={10} className="rounded-3xl overflow-hidden mb-6">
                <View className="bg-white/90 p-4">
                  <View className="flex-row items-center justify-between mb-4">
                    <View>
                      <Typo className="text-gray-800 text-xl font-semibold">Your Reservations</Typo>
                      <Typo className="text-gray-500">Track your orders</Typo>
                    </View>
                    <View className="bg-emerald-50 p-2 rounded-full">
                      <MaterialIcons name="receipt-long" size={24} color="#10B981" />
                    </View>
                  </View>
                </View>
              </BlurView>

              {reservations.length === 0 ? (
                <BlurView intensity={10} className="rounded-3xl overflow-hidden">
                  <View className="bg-white/90 p-8 items-center">
                    <View className="bg-gray-100 p-4 rounded-full mb-4">
                      <MaterialIcons name="receipt" size={32} color="#6B7280" />
                    </View>
                    <Typo className="text-gray-800 text-lg font-medium mb-2">No Reservations Yet</Typo>
                    <Typo className="text-gray-500 text-center">
                      Your reservation history will appear here
                    </Typo>
                  </View>
                </BlurView>
              ) : (
                reservations.map((reservation) => (
                  <BlurView
                    key={reservation.id}
                    intensity={10}
                    className="rounded-3xl overflow-hidden mb-4"
                  >
                    <View className="bg-white/90 p-4">
                      <View className="flex-row items-center justify-between mb-3">
                        <View className="flex-row items-center">
                          <View
                            className="p-2 rounded-full mr-3"
                            style={{ backgroundColor: `${getStatusColor(reservation.status)}20` }}
                          >
                            <MaterialIcons
                              name={getStatusIcon(reservation.status)}
                              size={20}
                              color={getStatusColor(reservation.status)}
                            />
                          </View>
                          <View>
                            <Typo className="text-gray-800 font-medium">
                              Order #{reservation.id.slice(-6)}
                            </Typo>
                            <Typo className="text-gray-500 text-sm">
                              {format(reservation.createdAt?.toDate() || new Date(), 'MMM d, yyyy h:mm a')}
                            </Typo>
                          </View>
                        </View>
                        <View
                          className="px-3 py-1 rounded-full"
                          style={{ backgroundColor: `${getStatusColor(reservation.status)}20` }}
                        >
                          <Typo
                            className="text-sm font-medium"
                            style={{ color: getStatusColor(reservation.status) }}
                          >
                            {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                          </Typo>
                        </View>
                      </View>

                      <View className="border-t border-gray-100 pt-3">
                        <View className="flex-row justify-between mb-2">
                          <Typo className="text-gray-600">Items</Typo>
                          <Typo className="text-gray-800 font-medium">
                            {reservation.items.length} items
                          </Typo>
                        </View>
                        <View className="flex-row justify-between">
                          <Typo className="text-gray-600">Total Amount</Typo>
                          <Typo className="text-emerald-600 font-semibold">
                            ₱{reservation.totalAmount.toFixed(2)}
                          </Typo>
                        </View>
                        <View className="flex-row justify-between mt-2">
                          <Typo className="text-gray-600">Payment Method</Typo>
                          <Typo className="text-gray-800 font-medium">
                            {reservation.paymentMethod}
                          </Typo>
                        </View>
                      </View>
                    </View>
                  </BlurView>
                ))
              )}
            </View>
          </ScrollView>
        </Animated.View>
      </SafeAreaView>
    </ScreenLayout>
  )
}

export default ReservationList 