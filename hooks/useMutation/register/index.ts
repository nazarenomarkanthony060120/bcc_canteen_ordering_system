import { registerUser } from '@/api/register'
import { useMutation } from '@tanstack/react-query'

export const userRegister = () => {
  return useMutation({
    mutationFn: registerUser,
  })
}
