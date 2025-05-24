import { db, serverTimestamp } from '@/lib/firestore'
import { AddFood } from '@/utils/types'
import { addDoc, collection } from 'firebase/firestore'

export const createFood = async (data: AddFood) => {
  return await addDoc(collection(db, 'foods'), {
    id: data.id,
    name: data.name,
    image: data.image,
    price: Number(data.price),
    quantity: Number(data.quantity),
    type: data.type,
    popularity: Number(0),
    description: data.description,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
}
