import { View, ScrollView, Animated } from 'react-native'
import React, { useRef, useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { ReservationOrders, ReservationStatus } from '@/utils/types'
import { useGetUserByUserId } from '@/hooks/useQuery/common/get/useGetUserByUserId'
import { useGetStoreByStoreId } from '@/hooks/useQuery/common/get/useGetStoreByStoreId'
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
import { useCompletePendingOrder } from '@/hooks/useMutation/seller/pending-order/useCompletePendingOrder'
import { useReadyForPickupOrder } from '@/hooks/useMutation/seller/pending-order/useReadyForPickupOrder'

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
  const { mutate: readyForPickupOrder, isPending: isPendingReadyForPickup } =
    useReadyForPickupOrder()
  const { mutate: completePendingOrder, isPending: isPendingComplete } =
    useCompletePendingOrder()
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
    console.log('Confirming order for reservation ID:', reservationId)
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

  const handleReadyForPickup = (reservationId: string) => {
    console.log('Setting order ready for pickup, reservation ID:', reservationId)
    readyForPickupOrder(
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
          console.error('Error setting order ready for pickup:', error)
        },
      },
    )
  }

  const handleComplete = (reservationId: string) => {
    console.log('Completing order for reservation ID:', reservationId)
    completePendingOrder(
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
          console.error('Error completing order:', error)
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
            paid={reservation.paid}
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
          text="Confirm"
        />
      )}

      {getReservationStatusResult({
        item: reservation.items,
        userId: auth.user?.uid,
      }) === ReservationStatus.CONFIRMED && (
        <ActionButtons
          reservationId={reservation.id}
          onConfirm={handleReadyForPickup}
          onCancel={handleCancel}
          isPendingCancel={isPendingCancel}
          isPendingConfirm={isPendingReadyForPickup}
          text={'Ready for Pickup'}
        />
      )}

      {getReservationStatusResult({
        item: reservation.items,
        userId: auth.user?.uid,
      }) === ReservationStatus.READY_FOR_PICKUP && (
        <ActionButtons
          reservationId={reservation.id}
          onConfirm={handleComplete}
          onCancel={handleCancel}
          isPendingCancel={isPendingCancel}
          isPendingConfirm={isPendingComplete}
          text={'Complete'}
        />
      )}
    </View>
  )
}

export default ViewReservationPending
