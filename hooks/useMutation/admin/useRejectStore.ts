import { approveStore } from '@/api/admin/approveStore'
import { rejectStore } from '@/api/admin/rejectStore'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useRejectStore = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: rejectStore,
    onSuccess: () => {
      // Invalidate all store-related queries
      queryClient.invalidateQueries({ queryKey: ['fetchAllStores'] })
      queryClient.invalidateQueries({ queryKey: ['fetchAllStoresByStatus'] })
      queryClient.invalidateQueries({ queryKey: ['fetchStoreById'] })
      queryClient.invalidateQueries({ queryKey: ['getStoreByStoreId'] })
    },
  })
}
