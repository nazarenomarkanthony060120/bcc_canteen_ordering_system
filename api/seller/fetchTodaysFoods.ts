import { db } from '@/lib/firestore'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { Food, StoreIdRequest } from '@/utils/types'

export const fetchTodaysFoods = async ({ id: storeId }: StoreIdRequest) => {
  if (!storeId) throw new Error('Store ID is required')

  const today = new Date()
  const startOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  )
  const endOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1,
  )

  const q = query(collection(db, 'foods'), where('id', '==', storeId))
  const querySnapshot = await getDocs(q)

  if (!querySnapshot.empty) {
    const allFoods = querySnapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      storeId: docSnap.data().id,
      name: docSnap.data().name,
      image: docSnap.data().image,
      price: docSnap.data().price,
      quantity: docSnap.data().quantity,
      type: docSnap.data().type,
      popularity: docSnap.data().popularity,
      description: docSnap.data().description,
      createdAt: docSnap.data().createdAt,
      updatedAt: docSnap.data().updatedAt,
    })) as Food[]

    const todaysFoods = allFoods.filter((food) => {
      if (!food.createdAt) return false
      const foodDate = (food.createdAt as any).toDate()
      const isToday = foodDate >= startOfDay && foodDate < endOfDay
      console.log('Food date check:', {
        foodName: food.name,
        foodDate: foodDate.toISOString(),
        isToday,
      })
      return isToday
    })

    return todaysFoods.sort((a, b) => {
      if (!a.createdAt || !b.createdAt) return 0
      return (
        (b.createdAt as any).toDate().getTime() -
        (a.createdAt as any).toDate().getTime()
      )
    })
  }

  return []
}
