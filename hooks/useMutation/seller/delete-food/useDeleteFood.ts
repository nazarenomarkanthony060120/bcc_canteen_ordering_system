import { deleteFood } from '@/api/seller/delete-food/deleteFood'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteFood = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteFood,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fetchTodaysFoods'] })
      queryClient.invalidateQueries({ queryKey: ['fetchFoodByStoreId'] })
    },
  })
}
