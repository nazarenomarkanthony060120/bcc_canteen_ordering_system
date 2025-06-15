import { View, ScrollView, Animated } from 'react-native'
import React, { useRef, useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { ReservationOrders, ReservationStatus } from '@/utils/types'
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
import PickupInfo from './components/PickupInfo'
import OrderDetails from './components/OrderDetails'
import OrderSummary from './components/OrderSummary'
import ActionButtons from './components/ActionButtons'
import { useAuth } from '@/context/auth'
import { useConfirmPendingOrder } from '@/hooks/useMutation/seller/pending-order/useConfirmPendingOrder'
import { useRouter } from 'expo-router'
import { getReservationStatusResult } from '@/features/common/parts/getReservationStatusResult'
import { useCancelPendingOrder } from '@/hooks/useMutation/seller/pending-order/useCancelPendingOrder'
import { useQueries } from '@tanstack/react-query'
import { getFoodByFoodId } from '@/api/common/getFoodByFoodId'

const ViewReservationPending = () => {
  const auth = useAuth()
  const { item, createdAt } = useLocalSearchParams()
  const reservation = JSON.parse(item as string) as ReservationOrders
  const createdAtDate = Timestamp.fromDate(new Date(createdAt as string))

  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(20)).current
  const scaleAnim = useRef(new Animated.Value(0.95)).current

  const { data: user } = useGetUserByUserId({ id: reservation.userId })
  const { data: store } = useGetStoreByStoreId({
    id: reservation.items[0].storeId,
  })

  // Fetch all food items in parallel
  const foodQueries = useQueries({
    queries: reservation.items.map((item) => ({
      queryKey: ['getFoodByFoodId', item.foodId],
      queryFn: () => getFoodByFoodId({ id: item.foodId }),
    })),
  })

  const foods = foodQueries.map((query) => query.data)
  const isLoadingFoods = foodQueries.some((query) => query.isLoading)

  const { mutate: confirmPendingOrder, isPending: isPendingConfirm } =
    useConfirmPendingOrder()
  const { mutate: cancelPendingOrder, isPending: isPendingCancel } =
    useCancelPendingOrder()
  const router = useRouter()

  const totalAmount = reservation.items.reduce(
    (total, item) =>
      auth.user?.uid === item.storeOwnerId ? total + item.totalPrice : total,
    0,
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
    confirmPendingOrder(
      {
        id: reservationId,
        foods: foods,
        userId: auth.user?.uid,
      },
      {
        onSuccess: () => {
          router.back()
        },
        onError: (error: Error) => {
          console.error('Error confirming order:', error)
        },
      },
    )
  }

  const handleCancel = (reservationId: string) => {
    cancelPendingOrder(
      {
        id: reservationId,
        foods: foods,
        userId: auth.user?.uid,
      },
      {
        onSuccess: () => {
          router.back()
        },
        onError: (error: Error) => {
          console.error('Error cancelling order:', error)
        },
      },
    )
  }

  if (!user || !store || isLoadingFoods) {
    return <LoadingIndicator />
  }

  // Debug pickup time
  console.log('ViewReservationPending - reservation.pickupTime:', reservation.pickupTime)
  console.log('ViewReservationPending - reservation object keys:', Object.keys(reservation))
  console.log('ViewReservationPending - full reservation:', JSON.stringify(reservation, null, 2))

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
          key={reservation.id}
        >
          <Header orderId={reservation.id} createdAt={createdAtDate} />
          <OrderStatus
            status={getReservationStatusResult({
              item: reservation.items,
              userId: auth.user?.uid,
            })}
          />
          <CustomerInfo user={user} />
          <StoreInfo store={store} />
          <PickupInfo pickupTime={reservation.pickupTime} />
          <OrderDetails
            key={reservation.id}
            items={reservation.items}
            foods={foods}
          />
          <OrderSummary
            paymentMethod={reservation.paymentMethod}
            totalAmount={totalAmount}
          />
        </Animated.View>
      </ScrollView>
      {getReservationStatusResult({
        item: reservation.items,
        userId: auth.user?.uid,
      }) === ReservationStatus.PENDING && (
        <ActionButtons
          reservationId={reservation.id}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          isPendingCancel={isPendingCancel}
          isPendingConfirm={isPendingConfirm}
        />
      )}
    </View>
  )
}

export default ViewReservationPending
