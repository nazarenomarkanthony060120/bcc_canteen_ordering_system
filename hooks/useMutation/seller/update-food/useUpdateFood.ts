import { updateFood } from '@/api/seller/update-food/updateFood'
import { useMutation } from '@tanstack/react-query'

export const useUpdateFood = () => {
  return useMutation({
    mutationFn: updateFood,
  })
}

