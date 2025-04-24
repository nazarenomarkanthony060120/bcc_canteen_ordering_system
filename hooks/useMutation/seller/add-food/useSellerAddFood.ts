import { createFood } from '@/api/seller/add-food/createFood'
import { useMutation } from '@tanstack/react-query'

export const useSellerAddFood = () => {
  return useMutation({
    mutationFn: createFood,
  })
}
