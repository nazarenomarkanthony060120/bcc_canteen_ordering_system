import { UpdateProfile } from '@/utils/types'
import {
  DocumentData,
  DocumentReference,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'

export const updateProfile = async (
  data: UpdateProfile,
  docRef: DocumentReference<DocumentData, DocumentData>,
) => {
  const updatedData = {
    phoneNumber: data.phoneNumber,
    address: data.address,
    birthDate: data.birthDate,
    status: data.status,
    updatedAt: serverTimestamp(),
  }

  return await updateDoc(docRef, updatedData)
}
