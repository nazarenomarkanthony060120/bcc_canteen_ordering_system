import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ImageWrapper from '@/components/parts/Image'
import { CANTEEN_IMAGE } from '@/constants/image'
import Typo from '@/components/common/typo'
import { ActivityIndicator, TouchableOpacity, View } from 'react-native'
import { useRouter } from 'expo-router'
import { useAuth } from '@/context/auth'
import { UserKYCStatus } from '@/utils/types'
import { useGetUserByUserId } from '@/hooks/useQuery/common/get/useGetUserByUserId'

const NoStore = () => {
  const router = useRouter()
  const auth = useAuth()

  const { data: userData, isLoading } = useGetUserByUserId({
    id: auth.user?.uid,
  })
  const userKYCStatus = userData?.status

  const navigateToAddStore = () => {
    router.push('/screens/(seller)/add-store/add-store')
  }

  const navigateToKYC = () => {
    router.push('/screens/(seller)/kyc/kyc')
  }

  let content = <ActivityIndicator />

  if (isLoading) {
    content = <ActivityIndicator />
  } else if (userKYCStatus === UserKYCStatus.APPROVED) {
    content = (
      <TouchableOpacity
        className="gap-3 items-center"
        onPress={navigateToAddStore}
      >
        <View>
          <Typo>You don't have store yet!</Typo>
          <Typo>Click the image to add Store</Typo>
        </View>
        <ImageWrapper
          source={CANTEEN_IMAGE}
          style={{ height: 100, width: 160 }}
        />
      </TouchableOpacity>
    )
  } else if (userKYCStatus === UserKYCStatus.APPLIED) {
    content = (
      <TouchableOpacity className="gap-3 items-center" onPress={navigateToKYC}>
        <View>
          <Typo>To continue, please finish your KYC first</Typo>
          <Typo>Click the image to go to KYC</Typo>
        </View>
        <ImageWrapper
          source={CANTEEN_IMAGE}
          style={{ height: 100, width: 160 }}
        />
      </TouchableOpacity>
    )
  } else if (userKYCStatus === UserKYCStatus.PENDING) {
    content = (
      <TouchableOpacity className="gap-3 items-center">
        <View>
          <Typo>Your KYC is under review</Typo>
          <Typo>Please wait a moment</Typo>
        </View>
        <ImageWrapper
          source={CANTEEN_IMAGE}
          style={{ height: 100, width: 160 }}
        />
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      {content}
    </SafeAreaView>
  )
}

export default NoStore
