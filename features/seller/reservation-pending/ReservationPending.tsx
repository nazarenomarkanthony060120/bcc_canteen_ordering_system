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
import { ReservationOrders } from '@/utils/types'

const ReservationPending = () => {
  const router = useRouter()
  const { reservations, isLoading, refreshing, onRefresh } =
    useFetchReservationPending()
  console.log('reservations screen ', reservations)
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

  const handleReservationPress = (id: string) => {
    router.push({
      pathname: '/screens/common/reservationList',
      params: { id },
    })
  }

  if (isLoading) return <LoadingIndicator />

  const pendingCount = reservations.filter((r) => r.status === 1).length
  const completedCount = reservations.filter((r) => r.status === 2).length

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
                reservations.map((reservation) => (
                  <ReservationCard
                    key={reservation.id}
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
