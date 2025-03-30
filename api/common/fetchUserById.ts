import { db, doc, getDoc } from "@/lib/firestore"
import { UserIdRequest } from "@/utils/types"

export const fetchUserById = async ({ id }: UserIdRequest) => {
  if (!id) throw new Error("User ID is required")
  const docRef = doc(db, "users", id)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return { id: docSnap.id, type: docSnap.data().type, ...docSnap.data() }
  }
  return undefined
}
