import { approveStore } from '@/api/admin/approveStore'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useApproveStore = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: approveStore,
    onSuccess: () => {
      // Invalidate all store-related queries
      queryClient.invalidateQueries({ queryKey: ['fetchAllStores'] })
      queryClient.invalidateQueries({ queryKey: ['fetchAllStoresByStatus'] })
      queryClient.invalidateQueries({ queryKey: ['fetchStoreById'] })
      queryClient.invalidateQueries({ queryKey: ['getStoreByStoreId'] })
    },
  })
}
