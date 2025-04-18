import { createStore } from '@/api/seller/store/createStore'
import { useMutation } from '@tanstack/react-query'

export const useCreateStore = () => {
  return useMutation({
    mutationFn: createStore,
  })
}
