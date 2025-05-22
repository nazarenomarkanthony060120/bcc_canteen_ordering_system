import { deleteCart } from '@/api/common/deleteCart'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteCart = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fetchCartByUserId'] })
    },
  })
} 