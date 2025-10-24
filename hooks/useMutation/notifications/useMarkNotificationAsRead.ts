import { markNotificationAsRead } from '@/api/notifications/markNotificationAsRead'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: markNotificationAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
    },
  })
}


