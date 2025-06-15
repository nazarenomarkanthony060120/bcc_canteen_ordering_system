import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Typo from '@/components/common/typo'
import PickupTimeModal from './PickupTimeModal'

interface CartFooterProps {
  total: number
  onCheckout: (pickupTime: Date) => void
  disabled?: boolean
}

const CartFooter: React.FC<CartFooterProps> = ({
  total,
  onCheckout,
  disabled,
}) => {
  const [showPickupModal, setShowPickupModal] = useState(false)

  const handleCheckoutPress = () => {
    setShowPickupModal(true)
  }

  const handlePickupTimeConfirm = (date: Date) => {
    onCheckout(date)
  }

  return (
    <>
      <View className="flex-row items-center justify-between">
        <View>
          <Typo className="text-gray-800 font-semibold">Total Amount</Typo>
          <Typo className="text-emerald-600 font-bold text-xl">
            ₱{total.toFixed(2)}
          </Typo>
        </View>
        <TouchableOpacity
          onPress={handleCheckoutPress}
          disabled={disabled}
          className={`px-6 py-3 rounded-full ${
            disabled ? 'bg-gray-300' : 'bg-emerald-500'
          }`}
        >
          <Typo className="text-white font-semibold">
            {disabled ? 'Processing...' : 'Checkout'}
          </Typo>
        </TouchableOpacity>
      </View>

      <PickupTimeModal
        visible={showPickupModal}
        onClose={() => setShowPickupModal(false)}
        onConfirm={handlePickupTimeConfirm}
      />
    </>
  )
}

export default CartFooter
