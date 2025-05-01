import { SystemHealth } from '@/utils/collections'

export const getSystemHealth = (status: String): Boolean => {
  return status !== SystemHealth.ALIVE
}
