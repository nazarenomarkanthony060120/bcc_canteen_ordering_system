import { db } from '@/lib/firestore'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { doc, updateDoc, increment } from 'firebase/firestore'

interface UpdateFavoriteFoodProps {
  foodId: string
  increment: boolean
}

export const useUpdateFavoriteFood = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      foodId,
      increment: shouldIncrement,
    }: UpdateFavoriteFoodProps) => {
      const foodRef = doc(db, 'foods', foodId)
      await updateDoc(foodRef, {
        popularity: increment(shouldIncrement ? 1 : -1),
      })
    },
    onSuccess: (_, { foodId }) => {
      queryClient.invalidateQueries({
        queryKey: ['foodPopularity', foodId],
        exact: true,
      })
    },
  })
}
