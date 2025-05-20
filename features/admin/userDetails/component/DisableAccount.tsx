import { View } from 'react-native'
import React from 'react'
import Button from '@/components/common/button'
import { AntDesign } from '@expo/vector-icons'
import Typo from '@/components/common/typo'
import { useDisableAccount } from '@/hooks/useMutation/admin/useDisableAccount'
import LoadingIndicator from '@/features/common/components/loadingIndicator/LoadingIndicator'
import { useRouter } from 'expo-router'

interface DisableAccountProps {
  userId: string
}

const DisableAccount = ({ userId }: DisableAccountProps) => {
  const { mutate: disableUser, isPending } = useDisableAccount()
  const router = useRouter()

  const handleDisableAccount = () => {
    disableUser(
      { id: userId },
      {
        onSuccess: () => {
          console.log('User disabled successfully')
          router.push('/screens/(admin)/dashboard/members')
        },
        onError: (error) => {
          console.error('Error approving user:', error)
        },
      },
    )
  }

  if (isPending) return <LoadingIndicator />
  return (
    <View className="p-5">
      <Button
        onPress={handleDisableAccount}
        className="w-full flex-row items-center justify-center gap-2 rounded-lg bg-red-700"
        icon={
          <AntDesign className="py-3" name="minus" size={20} color="white" />
        }
      >
        <Typo className="text-white">Disable</Typo>
      </Button>
    </View>
  )
}

export default DisableAccount
