import { approveStore } from '@/api/admin/approveStore'
import { useMutation } from '@tanstack/react-query'

export const useApproveStore = () => {
  return useMutation({
    mutationFn: approveStore,
  })
}
