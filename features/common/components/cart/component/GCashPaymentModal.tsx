import React from 'react'
import { View, Modal, TouchableOpacity, ScrollView } from 'react-native'
import { BlurView } from 'expo-blur'
import { MaterialIcons } from '@expo/vector-icons'
import Typo from '@/components/common/typo'
import ImageWrapper from '@/components/parts/Image'
import { CANTEEN_IMAGE } from '@/constants/image'
import { Cart as CartType } from '@/utils/types'
import { LinearGradient } from 'expo-linear-gradient'

interface GCashPaymentModalProps {
  visible: boolean
  onClose: () => void
  onConfirm: () => void
  cartItems: CartType[]
  total: number
  totalItems: number
}

const GCashPaymentModal: React.FC<GCashPaymentModalProps> = ({
  visible,
  onClose,
  onConfirm,
  cartItems,
  total,
  totalItems,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <BlurView
          intensity={20}
          className="rounded-3xl overflow-hidden w-[90%] max-w-[400px] max-h-[90%]"
        >
          <View className="bg-white/95 p-6">
            {/* Header */}
            <View className="items-center mb-6">
              <View className="w-16 h-16 bg-green-500 rounded-full items-center justify-center mb-4">
                <MaterialIcons name="phone-android" size={32} color="white" />
              </View>
              <Typo className="text-2xl font-bold text-green-600 text-center">
                GCash Payment
              </Typo>
            </View>

            {/* Cart Items */}
            <View className="mb-6">
              <Typo className="text-lg font-semibold mb-3">
                Your cart contains {totalItems} item(s):
              </Typo>

              <ScrollView
                className="max-h-96"
                showsVerticalScrollIndicator={false}
              >
                <View className="gap-3">
                  {cartItems?.map((item, index) => (
                    <View key={index} className="bg-gray-300/50 p-3 rounded-xl">
                      {/* Image container */}
                      <View className="items-center mb-3">
                        <View className="overflow-hidden rounded-xl">
                          <ImageWrapper
                            source={
                              item.gcashImage
                                ? {
                                    uri: `data:image/jpeg;base64,${item.gcashImage}`,
                                  }
                                : CANTEEN_IMAGE
                            }
                            style={{ height: 200, width: 250 }} // Smaller but proportional
                          />
                        </View>
                      </View>

                      {/* Content container */}
                      <View className="items-center">
                        <Typo className="font-medium text-gray-800 mb-1">
                          {`${item.quantity}x Item`}
                        </Typo>
                        <Typo className="text-green-600 font-semibold text-lg">
                          ₱{item.totalPrice.toFixed(2)}
                        </Typo>
                        <Typo className="text-gray-500 text-sm">
                          Quantity: {item.quantity}
                        </Typo>
                      </View>
                    </View>
                  ))}
                </View>
              </ScrollView>
            </View>

            {/* Total */}
            <View className="bg-green-50 p-4 rounded-xl mb-6">
              <View className="flex-row justify-between items-center">
                <Typo className="text-lg font-semibold text-green-800">
                  Total Amount:
                </Typo>
                <Typo className="text-xl font-bold text-green-600">
                  ₱{total.toFixed(2)}
                </Typo>
              </View>
            </View>

            {/* Action Buttons */}
            <View className="flex-row gap-3">
              <TouchableOpacity
                onPress={onClose}
                className="flex-1 bg-gray-500 py-4 rounded-full"
              >
                <Typo className="text-white font-semibold text-center text-lg">
                  Cancel
                </Typo>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onConfirm}
                className="flex-1 bg-green-500 py-4 rounded-full"
              >
                <Typo className="text-white font-semibold text-center text-lg">
                  Confirm Payment
                </Typo>
              </TouchableOpacity>
            </View>
          </View>
        </BlurView>
      </View>
    </Modal>
  )
}

export default GCashPaymentModal
