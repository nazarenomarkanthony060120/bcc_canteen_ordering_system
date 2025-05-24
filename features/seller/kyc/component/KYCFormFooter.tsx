import { Pressable, View } from 'react-native'
import React from 'react'
import {
  FieldValues,
  SubmitHandler,
  UseFormHandleSubmit,
} from 'react-hook-form'
import Button from '@/components/common/button'
import Typo from '@/components/common/typo'
import { CheckCircle2 } from 'lucide-react-native'

interface KYCFormFooterProps {
  handleSubmit: UseFormHandleSubmit<FieldValues, FieldValues>
  onSubmit: SubmitHandler<FieldValues>
  isPending: boolean
}

const KYCFormFooter = ({
  handleSubmit,
  onSubmit,
  isPending,
}: KYCFormFooterProps) => {
  return (
    <View className="gap-3">
      <Pressable
        className="bg-emerald-600 items-center justify-center rounded-xl p-4 shadow-lg active:bg-emerald-700"
        onPress={handleSubmit(onSubmit)}
        disabled={isPending}
      >
        <View className="flex-row items-center justify-center gap-2">
          {!isPending && <CheckCircle2 size={20} color="white" />}
          <Typo className="text-white font-semibold text-lg">
            {isPending ? 'Verifying...' : 'Complete KYC Verification'}
          </Typo>
        </View>
      </Pressable>
      <View className="items-center mt-2">
        <Typo className="text-gray-500 text-sm">
          This process usually takes 1-2 business days
        </Typo>
      </View>
    </View>
  )
}

export default KYCFormFooter
