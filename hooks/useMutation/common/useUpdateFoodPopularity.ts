import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateFoodPopularity } from '@/api/common/updateFoodPopularity'

export const useUpdateFoodPopularity = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateFoodPopularity,
    onSuccess: (_, variables) => {
      // Invalidate food queries
      queryClient.invalidateQueries({ queryKey: ['foods', variables.foodId] })
    },
  })
}
