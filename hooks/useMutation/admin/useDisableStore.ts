import { disableStore } from '@/api/admin/disableStore'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDisableStore = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: disableStore,
    onSuccess: () => {
      // Invalidate all store-related queries
      queryClient.invalidateQueries({ queryKey: ['fetchAllStores'] })
      queryClient.invalidateQueries({ queryKey: ['fetchAllStoresByStatus'] })
      queryClient.invalidateQueries({ queryKey: ['fetchStoreById'] })
      queryClient.invalidateQueries({ queryKey: ['getStoreByStoreId'] })
    },
  })
}
