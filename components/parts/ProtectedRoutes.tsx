import { useAuth } from '@/context/auth'
import { useRouter } from 'expo-router'
import React, { useEffect } from 'react'

interface ProtectedRoutesProps {
  children: React.ReactNode
}

const ProtectedRoutes = ({ children }: ProtectedRoutesProps) => {
  const auth = useAuth()
  const router = useRouter()

  const user = auth.user

  useEffect(() => {
    if (!user) router.push('/')
  }, [user])

  return <>{children}</>
}

export default ProtectedRoutes
