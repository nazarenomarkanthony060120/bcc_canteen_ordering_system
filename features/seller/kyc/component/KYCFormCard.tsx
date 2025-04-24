import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import KYCFormHeader from './KYCFormHeader'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { UserKYC } from '@/utils/types'
import KYCFormContents from './KYCFormContents'
import { ScrollView } from 'react-native'
import KYCFormFooter from './KYCFormFooter'
import { useUserKYCRegister } from '@/hooks/common/useMutation/useUserKYCRegister'
import Error from '@/components/parts/Error'
import { useAuth } from '@/context/auth'
import CountDown from '@/components/parts/CountDown'

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
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView className="gap-2 p-5">
        <KYCFormHeader />
        {showCountdown && (
          <CountDown
            time={5}
            route={'/screens/(seller)/dashboard/store'}
            message="You will be redirected to your store in"
          />
        )}
        <KYCFormContents control={control} />
        <KYCFormFooter
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          isPending={isPending}
        />
      </SafeAreaView>
      {Object.keys(errors).length > 0 && <Error errors={errors} />}
    </ScrollView>
  )
}

export default KYCFormCard
