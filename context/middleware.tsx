import React from 'react'
import { getSystemHealth } from '@/features/common/parts/getSystemHealth'
import { useGetSystemHealth } from '@/hooks/useQuery/health/health'
import { SystemHealth } from '@/utils/collections'
import TimeOut from '@/features/common/components/timeout/TimeOut'
import LoadingIndicator from '@/features/common/components/loadingIndicator/LoadingIndicator'

const HealthMiddleware = ({ children }: { children: React.ReactNode }) => {
  const { data: health, isFetching } = useGetSystemHealth()
  const result = getSystemHealth(health ?? SystemHealth.DEAD)

  if (isFetching) return <LoadingIndicator />

  if (!result) return <TimeOut />

  return <>{children}</>
}

export default HealthMiddleware
