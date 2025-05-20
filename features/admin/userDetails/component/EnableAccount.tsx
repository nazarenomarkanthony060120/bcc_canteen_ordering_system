import React from 'react'
import { useEnableAccount } from '@/hooks/useMutation/admin/useEnableAccount'
import { useRouter } from 'expo-router'
import LoadingIndicator from '@/features/common/components/loadingIndicator/LoadingIndicator'
import Button from '@/components/common/button'
import { AntDesign } from '@expo/vector-icons'
import Typo from '@/components/common/typo'
import { View } from 'react-native'

interface EnableAccountProps {
  userId: string
}

const EnableAccount = ({ userId }: EnableAccountProps) => {
  const { mutate: enableAccount, isPending } = useEnableAccount()
  const router = useRouter()

  const handleEnable = () => {
    enableAccount(
      { id: userId },
      {
        onSuccess: () => {
          console.log('User approved successfully')
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
        onPress={handleEnable}
        className="w-full flex-row items-center justify-center gap-2 rounded-lg bg-cyan-500"
        icon={
          <AntDesign className="py-3" name="adduser" size={20} color="white" />
        }
      >
        <Typo className="text-white">Enable</Typo>
      </Button>
    </View>
  )
}

export default EnableAccount
