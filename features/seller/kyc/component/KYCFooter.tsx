import { View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Typo from '@/components/common/typo'
import { ShieldCheck } from 'lucide-react-native'

const KYCFooter = () => {
  return (
    <SafeAreaView className="mt-8">
      <View className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100">
        <View className="flex-row items-center gap-3 mb-3">
          <ShieldCheck size={24} color="#059669" />
          <Typo className="text-emerald-700 font-semibold text-lg">Data Security</Typo>
        </View>
        <View className="gap-2">
          <Typo className="text-gray-600">
            Your information is encrypted and securely stored
          </Typo>
          <Typo className="text-gray-600">
            We follow strict data protection guidelines
          </Typo>
          <Typo className="text-gray-600">
            Your data will only be used for verification purposes
          </Typo>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default KYCFooter
