import React from 'react'
import Button from '@/components/common/button'
import { useDisableAccount } from '@/hooks/useMutation/admin/useDisableAccount'
import { useRouter } from 'expo-router'
import LoadingIndicator from '@/features/common/components/loadingIndicator/LoadingIndicator'
import { AntDesign } from '@expo/vector-icons'
import { Text, View } from 'react-native'

interface DisableAccountProps {
  userId: string
}

const DisableAccount = ({ userId }: DisableAccountProps) => {
  const { mutate: disableUser, isPending } = useDisableAccount()
  const router = useRouter()

  const handleDisable = () => {
    disableUser(
      { id: userId },
      {
        onSuccess: () => {
          console.log('User disabled successfully')
          router.push('/screens/(admin)/dashboard/members')
        },
        onError: (error) => {
          console.error('Error disabling user:', error)
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
        onPress={handleDisable}
        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 flex-row items-center justify-center gap-2 rounded-xl py-3.5 shadow-lg shadow-orange-500/20"
        icon={
          <AntDesign name="closecircle" size={22} color="white" />
        }
      >
        <Text className="text-white font-semibold text-base">Disable Account</Text>
      </Button>
    </View>
  )
}

export default DisableAccount
