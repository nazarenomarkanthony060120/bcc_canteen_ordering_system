import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ImageWrapper from '@/components/parts/Image'
import { CANTEEN_IMAGE } from '@/constants/image'
import Typo from '@/components/common/typo'
import { TouchableOpacity, View } from 'react-native'
import { useRouter } from 'expo-router'

const ViewStore = () => {
  const isKYC = false
  const router = useRouter()

  const navigateToAddStore = () => {
    router.push('/screens/(seller)/add-store/add-store')
  }

  const navigateToKYC = () => {
    router.push('/screens/(seller)/kyc/kyc')
  }

  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      {isKYC ? (
        <TouchableOpacity
          className="gap-3  items-center"
          onPress={navigateToAddStore}
        >
          <View>
            <Typo>You don't have store yet!. </Typo>
            <Typo>Click the image to add Store</Typo>
          </View>
          <ImageWrapper
            source={CANTEEN_IMAGE}
            style={{ height: 100, width: 160 }}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          className="gap-3 items-center"
          onPress={navigateToKYC}
        >
          <View>
            <Typo>To continue, please finish your KYC first</Typo>
            <Typo>Click the image to add Store</Typo>
          </View>
          <ImageWrapper
            source={CANTEEN_IMAGE}
            style={{ height: 100, width: 160 }}
          />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  )
}

export default ViewStore
