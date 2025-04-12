import {
  auth,
  createUserWithEmailAndPassword,
  db,
  doc,
  setDoc,
  serverTimestamp,
} from "@/lib/firestore";
import { RegisterRequeset } from "@/utils/types";

export const registerUser = async (data: RegisterRequeset) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    data.email,
    data.password,
  );
  const user = userCredential.user;

  await setDoc(doc(db, "users", user.uid), {
    id: data.id,
    fullName: data.fullName,
    gradeAndSection: data.gradeAndSection,
    phoneNumber: data.phoneNumber,
    type: data.type,
    email: data.email,
    password: data.password,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return user;
};
