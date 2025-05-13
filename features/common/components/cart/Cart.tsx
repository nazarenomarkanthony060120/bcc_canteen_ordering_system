import React from 'react'
import ScreenLayout from '../screenLayout/ScreenLayout'
import { SafeAreaView } from 'react-native-safe-area-context'
import CartHeader from './component/CartHeader'
import CartFooter from './component/CartFooter'
import CartFormCard from './component/CartFormCard'
import { View } from 'react-native'

const Cart = () => {
  return (
    <ScreenLayout>
      <SafeAreaView className="flex-1 justify-between gap-5 p-5">
        <View className="gap-5">
          <CartHeader />
          <CartFormCard />
        </View>
        <CartFooter />
      </SafeAreaView>
    </ScreenLayout>
  )
}

export default Cart
