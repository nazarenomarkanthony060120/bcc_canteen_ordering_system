import React from 'react'
import { useEnableAccount } from '@/hooks/useMutation/admin/useEnableAccount'
import { useRouter } from 'expo-router'
import LoadingIndicator from '@/features/common/components/loadingIndicator/LoadingIndicator'
import Button from '@/components/common/button'
import { AntDesign } from '@expo/vector-icons'
import { View, Text } from 'react-native'

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
    <View>
      <Text className="text-white text-center text-lg font-semibold mb-4">
        Account Actions
      </Text>
      <Button
        onPress={handleEnable}
        className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 flex-row items-center justify-center gap-2 rounded-xl py-3.5 shadow-lg shadow-cyan-500/20"
        icon={<AntDesign name="checkcircle" size={22} color="white" />}
      >
        <Text className="text-white font-semibold text-base">
          Enable Account
        </Text>
      </Button>
    </View>
  )
}

export default EnableAccount
