import { approveAccount } from '@/api/admin/approveAccount'
import { useMutation } from '@tanstack/react-query'

export const useApproveAccount = () => {
  return useMutation({
    mutationFn: approveAccount,
  })
}
