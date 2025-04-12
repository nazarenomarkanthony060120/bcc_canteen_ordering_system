import React, { createContext, useState, useEffect, useContext } from 'react'
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from '@/lib/firestore'
import { useFetchUserById } from '@/hooks/common/fetchUserById'

type ContextProps = {
  user: User | null
  type: UserType | null
}

export enum UserType {
  BUYER = 'Buyer',
  TEACHER = 'Teacher',
  STUDENT = 'Student',
  OTHERS = 'Others',
}

const AuthContext = createContext<Partial<ContextProps>>({})

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [userType, setUserType] = useState<UserType | null>(null)
  useEffect(() => {
    if (!auth) return

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      const userType = useFetchUserById({ id: firebaseUser?.uid }).data?.type
      if (userType) setUserType(userType)
      setUser(firebaseUser)
    })
    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, type: userType }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
