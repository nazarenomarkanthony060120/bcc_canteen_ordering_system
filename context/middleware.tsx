import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { getSystemHealth } from '@/features/common/parts/getSystemHealth'
import { useGetSystemHealth } from '@/hooks/useQuery/health/health'
import { SystemHealth } from '@/utils/collections'
import TimeOut from '@/features/common/components/timeout/TimeOut'

const HealthMiddleware = ({ children }: { children: React.ReactNode }) => {
  const { data: health, isFetching } = useGetSystemHealth()
  const result = getSystemHealth(health ?? SystemHealth.DEAD)

  console.log({ result, health })
  if (isFetching) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }

  if (!result) return <TimeOut />

  return <>{children}</>
}

export default HealthMiddleware
