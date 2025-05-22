import { disableStore } from '@/api/admin/disableStore'
import { useMutation } from '@tanstack/react-query'

export const useDisableStore = () => {
  return useMutation({
    mutationFn: disableStore,
  })
}
