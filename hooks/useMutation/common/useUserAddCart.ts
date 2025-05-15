import { userAddCart } from '@/api/common/userAddCart'
import { useMutation } from '@tanstack/react-query'

export const useUserAddCart = () => {
  return useMutation({
    mutationFn: userAddCart,
  })
}
