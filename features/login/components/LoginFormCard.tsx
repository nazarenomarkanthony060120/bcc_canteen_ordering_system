import React, { useState } from 'react'
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'
import { AuthErrorType, LoginRequest } from '@/utils/types'
import { useRouter } from 'expo-router'
import LoginFormHeader from './LoginFormHeader'
import { SafeAreaView } from 'react-native-safe-area-context'
import LoginFormContents from './LoginFormContents'
import LoginFormFooter from './LoginFormFooter'
import { ScrollView, View } from 'react-native'
import { useLogin } from '@/hooks/useMutation/login'
import { getErrorMessage } from '@/features/common/parts/getErrorMessage'
import Error from '@/components/parts/Error'
import Typo from '@/components/common/typo'
import { getUserRoutes } from '@/features/common/parts/getUserRoutes'

const LoginController = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { mutate: login, isPending } = useLogin()
  const [authError, setAuthError] = useState<AuthErrorType>()
  const router = useRouter()

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    login(data as LoginRequest, {
      onSuccess: (data) => {
        const route = getUserRoutes({ type: data?.type })
        router.push(route)
      },
      onError: (error: Error) => {
        const errorMessage = getErrorMessage(error.message)
        setAuthError(errorMessage)
      },
    })
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView className="gap-2">
        <LoginFormHeader />
        <LoginFormContents control={control} />
        <LoginFormFooter
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          isPending={isPending}
        />
        {authError && (
          <View className="items-start">
            <Typo className="text-red-500">{authError}</Typo>
          </View>
        )}
        {Object.keys(errors).length > 0 && <Error errors={errors} />}
      </SafeAreaView>
    </ScrollView>
  )
}

export default LoginController
