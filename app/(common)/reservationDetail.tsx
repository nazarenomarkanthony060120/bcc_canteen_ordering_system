import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ScreenLayout from '@/features/common/components/screenLayout/ScreenLayout'
import ReservationDetail from '@/features/common/components/reservationList/components/ReservationDetail'
import { useFetchReservations } from '@/hooks/useFetchReservations'

export default function ReservationDetailScreen() {
  const { id } = useLocalSearchParams()
  const { reservations } = useFetchReservations()
  const reservation = reservations.find(r => r.id === id)

  if (!reservation) return null

  return (
    <ScreenLayout>
      <SafeAreaView className="flex-1">
        <ReservationDetail reservation={reservation} />
      </SafeAreaView>
    </ScreenLayout>
  )
} 