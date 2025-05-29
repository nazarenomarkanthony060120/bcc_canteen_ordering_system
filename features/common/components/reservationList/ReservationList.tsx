import React, { useRef, useEffect } from 'react'
import { View, ScrollView, RefreshControl, Animated, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ScreenLayout from '../screenLayout/ScreenLayout'
import LoadingIndicator from '../loadingIndicator/LoadingIndicator'
import ReservationHeader from './components/ReservationHeader'
import EmptyReservation from './components/EmptyReservation'
import ReservationCard from './components/ReservationCard'
import { useFetchReservations } from '@/hooks/useQuery/seller/useFetchReservations'

const ErrorState = ({ message }: { message: string }) => (
  <View className="p-4 bg-red-50 rounded-lg">
    <Text className="text-red-600 text-center">{message}</Text>
  </View>
)

const ReservationList = () => {
  const {
    reservations = [],
    isLoading,
    refreshing,
    onRefresh,
    error,
  } = useFetchReservations()

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

  if (isLoading) return <LoadingIndicator />

  return (
    <ScreenLayout>
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
                title="Pull to refresh"
                titleColor="#10B981"
              />
            }
          >
            <View className="p-4">
              <ReservationHeader />

              {error ? (
                <ErrorState
                  message={error.message || 'Failed to load reservations'}
                />
              ) : !Array.isArray(reservations) ? (
                <ErrorState message="Invalid reservations data" />
              ) : reservations.length === 0 ? (
                <EmptyReservation />
              ) : (
                reservations.map((reservation, index) => (
                  <ReservationCard
                    key={index}
                    reservation={reservation}
                    fadeAnim={fadeAnim}
                    slideAnim={slideAnim}
                    scaleAnim={scaleAnim}
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

export default ReservationList
