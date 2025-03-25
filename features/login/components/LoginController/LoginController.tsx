
import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'
import { useLogin } from '@/hooks/login'
import Animated, { FadeInUp } from 'react-native-reanimated'
import Button from "@/components/button"
import { LoginRequest } from '@/utils/types'
import Typo from '@/components/typo'
import LoginInputContainer from './components/LoginInputContainer/LoginInputContainer'
import LoginActionContainer from './components/LoginActionContainer/LoginActionContainer'


const LoginController = () => {
  const { control, handleSubmit } = useForm()
  const { mutate: login, error, isPending } = useLogin()

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    login(data as LoginRequest)
  }
  
  return (
    <Animated.View entering={FadeInUp.delay(600).duration(500).damping(1).springify()} className="pt-6 flex items-center px-5 gap-2">
      <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>Login</Text>
      <LoginInputContainer control={control} />
      <LoginActionContainer handleSubmit={handleSubmit} isPending={isPending} onSubmit={onSubmit} />
      <Text>{error && <Text style={{ color: "red" }}>{error.message}</Text>}</Text>
    </Animated.View>
  )
}

export default LoginController