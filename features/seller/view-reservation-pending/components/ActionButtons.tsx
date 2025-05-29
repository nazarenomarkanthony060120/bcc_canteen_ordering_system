import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { BlurView } from 'expo-blur'
import { MaterialIcons } from '@expo/vector-icons'
import Typo from '@/components/common/typo'

interface ActionButtonsProps {
  reservationId: string
  onConfirm: (reservationId: string) => void
  onCancel: (reservationId: string) => void
  isPendingConfirm: boolean
  isPendingCancel: boolean
}

const ActionButtons = ({
  reservationId,
  onConfirm,
  onCancel,
  isPendingCancel,
  isPendingConfirm,
}: ActionButtonsProps) => {
  return (
    <BlurView intensity={20} className="border-t border-gray-100">
      <View className="p-4 bg-white/90">
        <View className="flex-row gap-3">
          <TouchableOpacity
            onPress={() => onCancel(reservationId)}
            className="flex-1 bg-red-50 py-4 rounded-xl flex-row items-center justify-center"
            style={{ elevation: 2 }}
            disabled={isPendingCancel}
          >
            <MaterialIcons name="cancel" size={24} color="#EF4444" />
            <Typo className="text-red-500 font-semibold ml-2">Cancel</Typo>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onConfirm(reservationId)}
            className="flex-1 bg-emerald-50 py-4 rounded-xl flex-row items-center justify-center"
            style={{ elevation: 2 }}
            disabled={isPendingConfirm}
          >
            <MaterialIcons name="check-circle" size={24} color="#10B981" />
            <Typo className="text-emerald-600 font-semibold ml-2">Confirm</Typo>
          </TouchableOpacity>
        </View>
      </View>
    </BlurView>
  )
}

export default ActionButtons
