import { userKYCRegister } from '@/api/common/userKYCRegister'
import { useMutation } from '@tanstack/react-query'

export const useUserKYCRegister = () => {
  return useMutation({
    mutationFn: userKYCRegister,
  })
}
