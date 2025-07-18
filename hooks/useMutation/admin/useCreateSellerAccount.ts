import { createSellerAccount } from '@/api/admin/createSellerAccount'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateSellerAccount = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createSellerAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] })
    },
  })
}
