import '../global.css'
import { Stack } from 'expo-router'
import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StatusBar } from 'react-native'
import { verifyInstallation } from 'nativewind'
import { AuthProvider } from '@/context/auth'
import HealthMiddleware from '../context/middleware'

const client = new QueryClient()

const RootLayout = () => {
  verifyInstallation()

  return (
    <QueryClientProvider client={client}>
      <AuthProvider>
        <HealthMiddleware>
          <Stack screenOptions={{ headerShown: false }} />
        </HealthMiddleware>
        <StatusBar backgroundColor="black" />
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default RootLayout
