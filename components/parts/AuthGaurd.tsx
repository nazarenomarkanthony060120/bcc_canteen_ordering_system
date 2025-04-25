import React, { useEffect } from 'react'
import { useAuth } from '@/context/auth'
import { useRouter } from 'expo-router'
import { ActivityIndicator, View } from 'react-native'

interface AuthGuardProps {
  children: React.ReactNode
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }

  return user ? <>{children}</> : null
}
