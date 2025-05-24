import { pendingStore } from '@/api/seller/my-store/pendingStore'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const usePendingStore = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: pendingStore,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getStoreByStoreId'] })
    },
  })
}
