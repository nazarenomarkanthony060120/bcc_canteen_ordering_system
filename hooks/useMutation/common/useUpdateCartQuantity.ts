import { updateCartQuantity } from '@/api/common/updateCartQuantity'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateCartQuantity = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateCartQuantity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fetchCartByUserId'] })
    },
  })
} 