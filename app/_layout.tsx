import '../global.css'
import { Stack } from 'expo-router'
import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StatusBar } from 'react-native'
import { verifyInstallation } from 'nativewind'
import { AuthProvider } from '@/context/auth'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useExpirationChecker } from '@/hooks/useExpirationChecker'

const client = new QueryClient()

const RootLayout = () => {
  verifyInstallation()
  useExpirationChecker() // Check for expired orders

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={client}>
        <AuthProvider>
          <Stack screenOptions={{ headerShown: false }} />
          <StatusBar backgroundColor="black" />
        </AuthProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  )
}

export default RootLayout
