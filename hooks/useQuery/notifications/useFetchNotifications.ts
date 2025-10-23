import { useQuery } from '@tanstack/react-query'
import { fetchNotificationsByUserId } from '@/api/notifications/fetchNotificationsByUserId'

export const useFetchNotifications = (userId: string | undefined) => {
  return useQuery({
    queryKey: ['notifications', userId],
    queryFn: () => fetchNotificationsByUserId(userId!),
    enabled: !!userId,
    refetchInterval: 30000, // Refetch every 30 seconds
  })
}

