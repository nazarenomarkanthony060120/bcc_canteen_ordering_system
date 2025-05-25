import React from 'react'
import { Modal, View, TouchableOpacity, Text } from 'react-native'

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
            <Text className="text-white text-center font-semibold">Pay with GCash</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            className="bg-gray-200 p-4 rounded-xl mb-3"
            onPress={() => onSelectPayment('Cash')}
          >
            <Text className="text-gray-800 text-center font-semibold">Pay with Cash</Text>
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