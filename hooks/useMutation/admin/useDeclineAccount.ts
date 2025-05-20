import { declineAccount } from '@/api/admin/declineAccount'
import { useMutation } from '@tanstack/react-query'

export const useDeclineAccount = () => {
  return useMutation({
    mutationFn: declineAccount,
  })
}
