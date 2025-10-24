import { useEffect } from 'react'
import { checkExpiredOrders } from '@/utils/notifications/checkExpiredOrders'

export const useExpirationChecker = () => {
  useEffect(() => {
    // Check immediately on mount
    checkExpiredOrders().catch(console.error)

    // Set up interval to check every 30 minutes
    const interval = setInterval(() => {
      checkExpiredOrders().catch(console.error)
    }, 30 * 60 * 1000) // 30 minutes

    return () => clearInterval(interval)
  }, [])
}


