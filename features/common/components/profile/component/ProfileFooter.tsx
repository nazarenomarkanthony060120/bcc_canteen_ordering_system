import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '@/components/common/button'
import Typo from '@/components/common/typo'
import { useAuth } from '@/context/auth'

const ProfileFooter = () => {
  const { logout } = useAuth()
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<Error | null>(null)

  const onSubmit = async () => {
    setIsLoading(true)
    try {
      await logout?.()
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <SafeAreaView className="gap-3 mb-16 p-5">
      <Button
        className="bg-cyan-400 items-center rounded-3xl p-5"
        onPress={onSubmit}
        loading={isLoading}
      >
        <Typo className="text-white">Logout</Typo>
      </Button>
      {error && <Typo className="text-red">{error.message}</Typo>}
    </SafeAreaView>
  )
}

export default ProfileFooter
