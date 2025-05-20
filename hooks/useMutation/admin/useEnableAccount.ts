import { enableAccount } from '@/api/admin/enableAccount'
import { useMutation } from '@tanstack/react-query'

export const useEnableAccount = () => {
  return useMutation({
    mutationFn: enableAccount,
  })
}
