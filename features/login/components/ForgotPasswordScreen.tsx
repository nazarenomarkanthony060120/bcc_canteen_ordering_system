import React, { useState } from 'react'
import { View, TextInput, Alert } from 'react-native'
import Button from '@/components/common/button'
import Typo from '@/components/common/typo'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const auth = getAuth()

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address')
      return
    }
    try {
      setLoading(true)
      await sendPasswordResetEmail(auth, email)
      Alert.alert(
        'Success',
        'Password reset email sent. Please check your inbox.',
      )
    } catch (error: any) {
      Alert.alert('Error', error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View className="flex-1 bg-white px-6 justify-center">
      <View className="mb-8">
        <Typo className="text-3xl font-bold text-gray-800 mb-3">
          Reset Password
        </Typo>
        <Typo className="text-gray-600">
          Enter your email address and we'll send you instructions to reset your
          password.
        </Typo>
      </View>
      <View className="space-y-6">
        <TextInput
          className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-base"
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
        />
        <Button
          onPress={handleResetPassword}
          loading={loading}
          className="bg-emerald-500 rounded-xl py-4"
        >
          <Typo className="text-white text-center font-semibold">
            {loading ? 'Sending...' : 'Send Reset Link'}
          </Typo>
        </Button>
      </View>
    </View>
  )
}

export default ForgotPassword
