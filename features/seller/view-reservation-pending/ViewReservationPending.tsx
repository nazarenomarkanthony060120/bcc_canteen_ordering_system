import { View, ScrollView, Animated } from 'react-native'
import React, { useRef, useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { ReservationOrders } from '@/utils/types'
import { useGetUserByUserId } from '@/hooks/useQuery/common/get/useGetUserByUserId'
import { useGetStoreByStoreId } from '@/hooks/useQuery/common/get/useGetStoreByStoreId'
import { useGetFoodByFoodId } from '@/hooks/useQuery/common/get/useGetFoodByFoodId'
import LoadingIndicator from '@/features/common/components/loadingIndicator/LoadingIndicator'
import { LinearGradient } from 'expo-linear-gradient'
import { Timestamp } from 'firebase/firestore'
import Header from './components/Header'
import OrderStatus from './components/OrderStatus'
import CustomerInfo from './components/CustomerInfo'
import StoreInfo from './components/StoreInfo'
import OrderDetails from './components/OrderDetails'
import OrderSummary from './components/OrderSummary'
import ActionButtons from './components/ActionButtons'
import { useAuth } from '@/context/auth'

const ViewReservationPending = () => {
  const auth = useAuth()
  const { item, createdAt } = useLocalSearchParams()
  const reservation = JSON.parse(item as string) as ReservationOrders
  const createdAtDate = Timestamp.fromDate(new Date(createdAt as string))

  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(20)).current
  const scaleAnim = useRef(new Animated.Value(0.95)).current

  const { data: user } = useGetUserByUserId({ id: reservation.userId })
  const { data: store } = useGetStoreByStoreId({ id: reservation.items[0].storeId })
  const { data: food } = useGetFoodByFoodId({ id: reservation.items[0].foodId })

  const totalAmount = reservation.items.reduce(
    (total, item) => 
      auth.user?.uid === item.storeOwnerId ? total + item.totalPrice : total,
    0
  )
 
  useEffect(() => {
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
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  const handleConfirm = (reservationId: string) => {
    // TODO: Implement confirm functionality
    console.log('Confirm reservation:', reservation.id)
  }

  const handleCancel = (reservationId: string) => {
    // TODO: Implement cancel functionality
    console.log('Cancel reservation:', reservation.id)
  }

  if (!user || !store || !food) {
    return <LoadingIndicator />
  }

  return (
    <View className="flex-1 bg-gray-50">
      <LinearGradient
        colors={['#F0FDF4', '#FFFFFF']}
        className="absolute inset-0"
      />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
          }}
          className="p-4"
        >
          <Header 
            orderId={reservation.id} 
            createdAt={createdAtDate} 
          />
          <OrderStatus status={reservation.status} />
          <CustomerInfo user={user} />
          <StoreInfo store={store} />
          <OrderDetails items={reservation.items} food={food} />
          <OrderSummary
            paymentMethod={reservation.paymentMethod}
            totalAmount={totalAmount}
          />
        </Animated.View>
      </ScrollView>
      <ActionButtons reservationId={reservation.id} onConfirm={handleConfirm} onCancel={handleCancel} />
    </View>
  )
}

export default ViewReservationPending
