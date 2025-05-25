import React from 'react'
import { Modal, View, TouchableOpacity, Text } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

interface PaymentMethodModalProps {
  visible: boolean
  onClose: () => void
  onSelectPayment: (method: 'GCash' | 'Cash') => void
  total: number
}

const PaymentMethodModal: React.FC<PaymentMethodModalProps> = ({
  visible,
  onClose,
  onSelectPayment,
  total,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/50">
        <View className="bg-white rounded-t-3xl p-6">
          <Text className="text-xl font-bold mb-4">Select Payment Method</Text>
          <Text className="text-gray-600 mb-6">Total Amount: ₱{total.toFixed(2)}</Text>
          
          <TouchableOpacity
            className="bg-green-500 p-4 rounded-xl mb-3"
            onPress={() => onSelectPayment('GCash')}
          >
            <View className="flex-row items-center justify-center">
              <MaterialIcons name="phone-android" size={24} color="white" />
              <Text className="text-white text-center font-semibold ml-2">Pay with GCash</Text>
            </View>
            <Text className="text-white/80 text-center text-sm mt-1">Coming Soon</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            className="bg-emerald-600 p-4 rounded-xl mb-3"
            onPress={() => onSelectPayment('Cash')}
          >
            <View className="flex-row items-center justify-center">
              <MaterialIcons name="payments" size={24} color="white" />
              <Text className="text-white text-center font-semibold ml-2">Reserve & Pay at Counter</Text>
            </View>
            <Text className="text-white/80 text-center text-sm mt-1">Reserve your order and pay in cash when you collect it</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            className="p-4"
            onPress={onClose}
          >
            <Text className="text-gray-500 text-center">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

export default PaymentMethodModal 