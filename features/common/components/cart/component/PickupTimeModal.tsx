import React, { useState } from 'react'
import { View, Modal, TouchableOpacity, ScrollView } from 'react-native'
import Typo from '@/components/common/typo'

interface PickupTimeModalProps {
  visible: boolean
  onClose: () => void
  onConfirm: (date: Date) => void
}

const PickupTimeModal: React.FC<PickupTimeModalProps> = ({
  visible,
  onClose,
  onConfirm,
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedHour, setSelectedHour] = useState(new Date().getHours())
  const [selectedMinute, setSelectedMinute] = useState(0)

  // Generate next 7 days
  const generateDates = () => {
    const dates = []
    for (let i = 0; i < 1; i++) {
      const date = new Date()
      date.setDate(date.getDate() + i)
      dates.push(date)
    }
    return dates
  }

  // Generate hours (8 AM to 8 PM)
  const generateHours = () => {
    const hours = []
    for (let i = 8; i <= 17; i++) {
      hours.push(i)
    }
    return hours
  }

  // Generate minutes (0, 15, 30, 45)
  const generateMinutes = () => [0, 15, 30, 45]

  const handleConfirm = () => {
    const finalDate = new Date(selectedDate)
    finalDate.setHours(selectedHour, selectedMinute, 0, 0)
    onConfirm(finalDate)
    onClose()
  }

  const formatDate = (date: Date) => {
    const today = new Date()

    if (date.toDateString() === today.toDateString()) {
      return 'Today'
    } 
  }

  const formatTime = (hour: number, minute: number) => {
    const period = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
    const displayMinute = minute.toString().padStart(2, '0')
    return `${displayHour}:${displayMinute} ${period}`
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white rounded-3xl p-6 w-[90%] max-w-[400px] max-h-[80%]">
          <Typo className="text-xl font-bold text-center mb-6">
            Select Pickup Time
          </Typo>

          {/* Date Selection */}
          <View className="mb-6">
            <Typo className="text-lg font-semibold mb-3">Select Date</Typo>
            <View className="items-center justify-center">
              {generateDates().map((date, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedDate(date)}
                  className={`px-4 py-3 rounded-xl min-w-[80px] ${
                    selectedDate.toDateString() === date.toDateString()
                      ? 'bg-emerald-500'
                      : 'bg-gray-100'
                  }`}
                >
                  <Typo className={`text-center text-sm ${
                    selectedDate.toDateString() === date.toDateString()
                      ? 'text-white font-semibold'
                      : 'text-gray-700'
                  }`}>
                    Today
                  </Typo>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Time Selection */}
          <View className="mb-6">
            <Typo className="text-lg font-semibold mb-3">Select Time</Typo>
            
            {/* Hours */}
            <View className="mb-4">
              <Typo className="text-sm text-gray-600 mb-2">Hour</Typo>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className="flex-row gap-2">
                  {generateHours().map((hour) => (
                    <TouchableOpacity
                      key={hour}
                      onPress={() => setSelectedHour(hour)}
                      className={`px-3 py-2 rounded-lg min-w-[50px] ${
                        selectedHour === hour
                          ? 'bg-emerald-500'
                          : 'bg-gray-100'
                      }`}
                    >
                      <Typo className={`text-center ${
                        selectedHour === hour
                          ? 'text-white font-semibold'
                          : 'text-gray-700'
                      }`}>
                        {hour > 12 ? hour - 12 : hour === 0 ? 12 : hour}
                        {hour >= 12 ? 'PM' : 'AM'}
                      </Typo>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>

            {/* Minutes */}
            <View>
              <Typo className="text-sm text-gray-600 mb-2">Minute</Typo>
              <View className="flex-row gap-2">
                {generateMinutes().map((minute) => (
                  <TouchableOpacity
                    key={minute}
                    onPress={() => setSelectedMinute(minute)}
                    className={`px-3 py-2 rounded-lg flex-1 ${
                      selectedMinute === minute
                        ? 'bg-emerald-500'
                        : 'bg-gray-100'
                    }`}
                  >
                    <Typo className={`text-center ${
                      selectedMinute === minute
                        ? 'text-white font-semibold'
                        : 'text-gray-700'
                    }`}>
                      :{minute.toString().padStart(2, '0')}
                    </Typo>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          {/* Selected Time Display */}
          <View className="bg-emerald-50 p-4 rounded-xl mb-6">
            <Typo className="text-center text-emerald-800 font-semibold">
              Pickup: Today at {formatTime(selectedHour, selectedMinute)}
            </Typo>
          </View>

          {/* Action Buttons */}
          <View className="flex-row justify-end gap-4">
            <TouchableOpacity
              onPress={onClose}
              className="px-6 py-3 rounded-full bg-gray-200"
            >
              <Typo className="text-gray-800 font-semibold">Cancel</Typo>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleConfirm}
              className="px-6 py-3 rounded-full bg-emerald-500"
            >
              <Typo className="text-white font-semibold">Confirm</Typo>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default PickupTimeModal 