import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import KYCFormHeader from './KYCFormHeader'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { UserKYC } from '@/utils/types'
import KYCFormContents from './KYCFormContents'
import { ScrollView, View } from 'react-native'
import KYCFormFooter from './KYCFormFooter'
import Error from '@/components/parts/Error'
import { useAuth } from '@/context/auth'
import CountDown from '@/components/parts/CountDown'
import { useUserKYCRegister } from '@/hooks/useMutation/seller/kyc/useUserKYCRegister'

const KYCFormCard = () => {
  const [showCountdown, setShowCountdown] = useState(false)
  const auth = useAuth()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { mutate: userKycRegister, isPending } = useUserKYCRegister()

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data) 
    const formData = {
      id: auth.user?.uid,
      name: data.name,
      phoneNumber: data.phoneNumber,
      address: data.address,
      birthDate: data.birthDate,
    }
    userKycRegister(formData as UserKYC, {
      onSuccess: () => {
        setShowCountdown(true)
      },
    })
  }

  return (
      <View className="bg-white/60 rounded-2xl shadow-lg p-6">
        {showCountdown && (
          <View className="my-4">
            <CountDown
              time={5}
              route={'/screens/(seller)/dashboard/store'}
              message="You will be redirected to your store in"
            />
          </View>
        )}
        <View className="mt-6">
          <KYCFormContents control={control} />
        </View>
        <View className="mt-8">
          <KYCFormFooter
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            isPending={isPending}
          />
        </View>
        {Object.keys(errors).length > 0 && (
          <View className="mt-4">
            <Error errors={errors} />
          </View>
        )}
      </View>
  )
}

export default KYCFormCard
