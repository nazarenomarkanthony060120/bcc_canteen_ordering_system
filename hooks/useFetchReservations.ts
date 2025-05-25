import { useState, useEffect } from 'react'
import { useAuth } from '@/context/auth'
import { fetchReservations,  } from '@/api/reservations/fetchReservations'
import { Reservation } from '@/utils/types'

export const useFetchReservations = () => {
  const auth = useAuth()
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const getReservations = async () => {
    try {
      const data = await fetchReservations(auth.user?.uid)
      setReservations(data)
    } catch (error) {
      console.error('Error fetching reservations:', error)
    } finally {
      setIsLoading(false)
      setRefreshing(false)
    }
  }

  const onRefresh = () => {
    setRefreshing(true)
    getReservations()
  }

  useEffect(() => {
    getReservations()
  }, [])

  return {
    reservations,
    isLoading,
    refreshing,
    onRefresh
  }
} 