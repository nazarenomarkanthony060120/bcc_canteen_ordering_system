import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toggleFavorite } from '@/api/common/toggleFavorite'

export const useToggleFavorite = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: toggleFavorite,
    onSuccess: () => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ['favorites'] })
    },
  })
}
