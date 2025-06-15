import React from 'react'
import { View, Text } from 'react-native'
import { BlurView } from 'expo-blur'
import Typo from '@/components/common/typo'

interface PickupInfoProps {
  pickupTime?: Date | string | null
}

const PickupInfo: React.FC<PickupInfoProps> = ({ pickupTime }) => {
  const formatPickupTime = () => {
    console.log('PickupInfo - Raw pickupTime:', pickupTime)
    console.log('PickupInfo - Type of pickupTime:', typeof pickupTime)
    console.log('PickupInfo - pickupTime instanceof Date:', pickupTime instanceof Date)
    
    if (!pickupTime) {
      console.log('PickupInfo - No pickup time provided')
      return {
        date: 'No pickup time set',
        time: '--:--',
        dayLabel: '',
      }
    }

    try {
      let pickupDate: Date

      // Handle different date formats
      if (pickupTime instanceof Date) {
        console.log('PickupInfo - Processing as Date object')
        pickupDate = pickupTime
      } else if (typeof pickupTime === 'string') {
        console.log('PickupInfo - Processing as string:', pickupTime)
        pickupDate = new Date(pickupTime)
      } else if (pickupTime && typeof pickupTime === 'object' && 'toDate' in pickupTime) {
        console.log('PickupInfo - Processing as Firestore Timestamp')
        // Handle Firestore Timestamp
        pickupDate = (pickupTime as any).toDate()
      } else if (pickupTime && typeof pickupTime === 'object' && 'seconds' in pickupTime) {
        console.log('PickupInfo - Processing as Firestore Timestamp with seconds')
        // Handle Firestore Timestamp format { seconds: number, nanoseconds: number }
        pickupDate = new Date((pickupTime as any).seconds * 1000)
      } else {
        console.log('PickupInfo - Unknown format, raw value:', JSON.stringify(pickupTime))
        return {
          date: `Debug: ${JSON.stringify(pickupTime)}`,
          time: '--:--',
          dayLabel: '',
        }
      }

      console.log('PickupInfo - Parsed pickupDate:', pickupDate)
      console.log('PickupInfo - pickupDate.getTime():', pickupDate.getTime())
      
      if (isNaN(pickupDate.getTime())) {
        console.log('PickupInfo - Date is invalid after parsing')
        return {
          date: 'Invalid date after parsing',
          time: '--:--',
          dayLabel: '',
        }
      }

      const today = new Date()
      const tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 1)

      let dayLabel = ''
      let dateString = ''

      if (pickupDate.toDateString() === today.toDateString()) {
        dayLabel = 'Today'
        dateString = pickupDate.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        })
      } else if (pickupDate.toDateString() === tomorrow.toDateString()) {
        dayLabel = 'Tomorrow'
        dateString = pickupDate.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        })
      } else {
        dateString = pickupDate.toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        })
      }

      const timeString = pickupDate.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })

      return {
        date: dateString,
        time: timeString,
        dayLabel,
      }
    } catch (error) {
      console.error('Error formatting pickup time:', error)
      return {
        date: 'Error parsing date',
        time: '--:--',
        dayLabel: '',
      }
    }
  }

  const { date, time, dayLabel } = formatPickupTime()

  if (!pickupTime) {
    return null // Don't render if no pickup time
  }

  return (
    <BlurView intensity={10} className="rounded-3xl overflow-hidden mb-4">
      <View className="bg-white/90 p-4">
        <View className="flex-row items-center mb-3">
          <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center mr-3">
            <Text className="text-blue-600 text-lg">🕒</Text>
          </View>
          <View>
            <Typo className="text-lg font-bold text-gray-800">Pickup Information</Typo>
            <Typo className="text-sm text-gray-500">Customer pickup schedule</Typo>
          </View>
        </View>

        <View className="bg-blue-50 rounded-xl p-4 border border-blue-100">
          <View className="flex-row justify-between items-center">
            <View className="flex-1">
              <View className="flex-row items-center mb-2">
                <Typo className="text-sm text-blue-600 font-medium">📅 Pickup Date</Typo>
                {dayLabel && (
                  <View className="ml-2 px-2 py-1 bg-blue-500 rounded-full">
                    <Typo className="text-xs text-white font-semibold">{dayLabel}</Typo>
                  </View>
                )}
              </View>
              <Typo className="text-gray-800 font-semibold text-base">{date}</Typo>
            </View>
            
            <View className="items-end">
              <Typo className="text-sm text-blue-600 font-medium mb-2">⏰ Time</Typo>
              <View className="bg-white rounded-lg px-3 py-2 border border-blue-200">
                <Typo className="text-blue-700 font-bold text-lg">{time}</Typo>
              </View>
            </View>
          </View>

          {dayLabel && (
            <View className="mt-3 pt-3 border-t border-blue-200">
              <View className="flex-row items-center">
                <Text className="text-blue-600 mr-2">💡</Text>
                <Typo className="text-sm text-blue-700 flex-1">
                  {dayLabel === 'Today' 
                    ? 'Customer will pick up their order today. Please prepare accordingly.'
                    : dayLabel === 'Tomorrow'
                    ? 'Customer will pick up their order tomorrow. You have time to prepare.'
                    : 'Please prepare the order for the scheduled pickup time.'
                  }
                </Typo>
              </View>
            </View>
          )}
        </View>
      </View>
    </BlurView>
  )
}

export default PickupInfo 