import { registerUser } from '@/api/register'
import { useMutation } from '@tanstack/react-query'

export const useUserRegister = () => {
  return useMutation({
    mutationFn: registerUser,
  })
}
