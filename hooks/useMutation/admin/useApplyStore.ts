import { applyStore } from '@/api/admin/applyStore'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useApplyStore = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: applyStore,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fetchAllStores'] })
      queryClient.invalidateQueries({ queryKey: ['fetchAllStoresByStatus'] })
      queryClient.invalidateQueries({ queryKey: ['fetchStoreById'] })
      queryClient.invalidateQueries({ queryKey: ['getStoreByStoreId'] })
    },
  })
}
