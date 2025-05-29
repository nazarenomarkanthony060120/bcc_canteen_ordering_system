import React, { useRef, useEffect } from 'react'
import { View, ScrollView, RefreshControl, Animated } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import ScreenLayout from '@/features/common/components/screenLayout/ScreenLayout'
import LoadingIndicator from '@/features/common/components/loadingIndicator/LoadingIndicator'
import { useRouter } from 'expo-router'
import Header from './components/Header'
import StatsCard from './components/StatsCard'
import EmptyState from './components/EmptyState'
import ReservationCard from './components/ReservationCard'
import { useFetchReservationPending } from '@/hooks/useQuery/seller/useFetchReservationPending'
import { ReservationOrders, ReservationStatus } from '@/utils/types'
import { Timestamp } from 'firebase/firestore'
import { useAuth } from '@/context/auth'

const ReservationPending = () => {
  const auth = useAuth()
  const router = useRouter()
  const { reservations, isLoading, refreshing, onRefresh } =
    useFetchReservationPending()

  console.log(
    'reservations: ',
    reservations.map((data) =>
      data.items.filter((item) => item.storeOwnerId === auth.user?.uid),
    ),
  )
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(20)).current
  const scaleAnim = useRef(new Animated.Value(0.95)).current

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

  const handleReservationPress = (
    item: ReservationOrders,
    createdAt: Timestamp,
  ) => {
    router.push({
      pathname:
        '/screens/(seller)/view-reservation-pending/viewReservationPending',
      params: {
        item: JSON.stringify(item),
        createdAt: createdAt.toDate().toISOString(),
      },
    })
  }

  if (isLoading) return <LoadingIndicator />

  const completedCount = reservations.reduce((total, reservation) => {
    const storeOwnerItems = reservation.items.filter(
      (item) => item.storeOwnerId === auth.user?.uid,
    )
    const completedItems = storeOwnerItems.filter(
      (item) =>
        item.status !== ReservationStatus.PENDING &&
        item.status !== ReservationStatus.CANCELLED,
    ).length
    return total + (completedItems % 2)
  }, 0)

  const pendingCount = reservations.reduce((total, reservation) => {
    const storeOwnerItems = reservation.items.filter(
      (item) => item.storeOwnerId === auth.user?.uid,
    )
    const pendingItems = storeOwnerItems.filter(
      (item) =>
        item.status !== ReservationStatus.COMPLETED &&
        item.status !== ReservationStatus.CANCELLED,
    ).length
    return total + (pendingItems % 2)
  }, 0)

  return (
    <ScreenLayout>
      <LinearGradient
        colors={['#F0FDF4', '#FFFFFF']}
        className="absolute inset-0"
      />
      <SafeAreaView className="flex-1">
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
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
              <Header />

              <View className="flex-row gap-3 mb-6">
                <StatsCard
                  icon="schedule"
                  count={pendingCount}
                  label="Pending"
                  iconColor="#10B981"
                  countColor="text-emerald-600"
                  bgColor="bg-emerald-50"
                />
                <StatsCard
                  icon="check-circle"
                  count={completedCount}
                  label="Completed"
                  iconColor="#3B82F6"
                  countColor="text-blue-600"
                  bgColor="bg-blue-50"
                />
              </View>

              {reservations.length === 0 ? (
                <EmptyState />
              ) : (
                reservations.map((reservation, index) => (
                  <ReservationCard
                    key={index}
                    reservation={reservation}
                    onPress={handleReservationPress}
                  />
                ))
              )}
            </View>
          </ScrollView>
        </Animated.View>
      </SafeAreaView>
    </ScreenLayout>
  )
}

export default ReservationPending
