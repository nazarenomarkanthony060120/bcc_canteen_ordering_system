import { approveUser } from '@/api/admin/approveUser'
import { UserIdRequest } from '@/utils/types'
import { useMutation } from '@tanstack/react-query'

export const useApproveUser = () => {
  return useMutation({
    mutationFn: approveUser,
  })
}
