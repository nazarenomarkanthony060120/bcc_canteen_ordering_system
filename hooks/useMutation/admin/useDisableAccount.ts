import { disableAccount } from '@/api/admin/disableAccount'
import { useMutation } from '@tanstack/react-query'

export const useDisableAccount = () => {
  return useMutation({
    mutationFn: disableAccount,
  })
}
