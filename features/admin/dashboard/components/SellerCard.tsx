import React from 'react'
import { View, Text, TouchableOpacity, Animated } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { User, UserKYCStatus } from '@/utils/types'
import { getUserStatus } from '@/features/common/parts/getUserStatus'
import { getUserStatusColor } from '@/features/common/parts/getUserStatusColor'
import { createdAtFormatted } from '@/features/common/parts/getCreatedAtFormatted'
import { Timestamp } from 'firebase/firestore'
import { useRouter } from 'expo-router'
import { useFetchStoreByUserId } from '@/hooks/useQuery/common/fetch/useFetchStoreByUserId'
import { getStoreStatusColor } from '@/features/common/parts/getStoreStatusColor'
import ImageWrapper from '@/components/parts/Image'
import { PERSON_ICON } from '@/constants/image'

interface SellerCardProps {
  seller: User
  fadeAnim: Animated.Value
  slideAnim: Animated.Value
  index: number
}

const SellerCard: React.FC<SellerCardProps> = ({
  seller,
  fadeAnim,
  slideAnim,
  index,
}) => {
  const router = useRouter()
  const { data: stores } = useFetchStoreByUserId({ id: seller.id })
  const userStatusColor = getUserStatusColor(seller.status)
  const userStatusText = getUserStatus(seller.status)

  const store = stores?.[0]
  const storeStatusConfig = store ? getStoreStatusColor(store.status) : null

  const handlePress = () => {
    router.push({
      pathname: '/screens/(admin)/members/userDetails',
      params: { userId: seller.id },
    })
  }

  const getStatusBadge = () => {
    let bgColor = 'bg-gray-100'
    let textColor = 'text-gray-600'
    let iconName = 'help'

    switch (seller.status) {
      case UserKYCStatus.APPROVED:
        bgColor = 'bg-emerald-100'
        textColor = 'text-emerald-700'
        iconName = 'check-circle'
        break
      case UserKYCStatus.PENDING:
        bgColor = 'bg-amber-100'
        textColor = 'text-amber-700'
        iconName = 'schedule'
        break
      case UserKYCStatus.APPLIED:
        bgColor = 'bg-blue-100'
        textColor = 'text-blue-700'
        iconName = 'hourglass-empty'
        break
      case UserKYCStatus.DISABLED:
        bgColor = 'bg-red-100'
        textColor = 'text-red-700'
        iconName = 'block'
        break
      case UserKYCStatus.REJECTED:
        bgColor = 'bg-red-100'
        textColor = 'text-red-700'
        iconName = 'cancel'
        break
    }

    return (
      <View className={` px-3 py-1.5 rounded-full w-28 ${bgColor}`}>
        <View className="flex-row items-center ">
          <MaterialIcons
            name={iconName as any}
            size={14}
            color={userStatusColor.color}
          />
          <Text className={`ml-1.5 text-sm font-medium ${textColor}`}>
            {userStatusText}
          </Text>
        </View>
      </View>
    )
  }

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
      }}
    >
      <TouchableOpacity
        onPress={handlePress}
        className="bg-white/95 backdrop-blur-lg rounded-3xl mb-4 overflow-hidden border border-white/30"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 5,
        }}
      >
        <View className="p-6">
          {/* Header with avatar and basic info */}
          <View className="flex-row items-center mb-4">
            <View className="mr-4">
              <View className="w-16 h-16 rounded-full overflow-hidden bg-gray-100">
                <ImageWrapper
                  source={
                    seller.image
                      ? { uri: `data:image/jpeg;base64,${seller.image}` }
                      : PERSON_ICON
                  }
                  style={{ width: '100%', height: '100%' }}
                />
              </View>
            </View>
            <View className="flex-1">
              <Text className="text-xl font-bold text-gray-800 mb-1">
                {seller.name}
              </Text>
              <Text className="text-gray-600 text-sm mb-2">{seller.email}</Text>
              {/* {getStatusBadge()} */}
            </View>
          </View>

          {/* Seller Details */}
          <View className="space-y-3 gap-3">
            <View className="flex-row items-center gap-3">
              <View className="bg-blue-50 p-2 rounded-full">
                <MaterialIcons name="person" size={20} color="#3B82F6" />
              </View>
              <View className="flex-1">
                <Text className="text-gray-500 text-sm">Seller ID</Text>
                <Text className="text-gray-800 font-medium">
                  {seller.managedId || seller.id}
                </Text>
              </View>
            </View>

            <View className="flex-row items-center gap-3">
              <View className="bg-purple-50 p-2 rounded-full">
                <MaterialIcons
                  name="account-circle"
                  size={20}
                  color="#8B5CF6"
                />
              </View>
              <View className="flex-1">
                <Text className="text-gray-500 text-sm">Account Type</Text>
                <Text className="text-gray-800 font-medium">Seller</Text>
              </View>
            </View>

            {seller.address && (
              <View className="flex-row items-center gap-3">
                <View className="bg-green-50 p-2 rounded-full">
                  <MaterialIcons name="location-on" size={20} color="#10B981" />
                </View>
                <View className="flex-1">
                  <Text className="text-gray-500 text-sm">Address</Text>
                  <Text className="text-gray-800 font-medium">
                    {seller.address}
                  </Text>
                </View>
              </View>
            )}

            <View className="flex-row items-center gap-3">
              <View className="bg-amber-50 p-2 rounded-full">
                <MaterialIcons name="access-time" size={20} color="#F59E0B" />
              </View>
              <View className="flex-1">
                <Text className="text-gray-500 text-sm">Date Registered</Text>
                <Text className="text-gray-800 font-medium">
                  {createdAtFormatted(seller.createdAt as unknown as Timestamp)}
                </Text>
              </View>
            </View>

            <View className="flex-row items-center gap-3">
              <View className="bg-indigo-50 p-2 rounded-full">
                <MaterialIcons name="update" size={20} color="#6366F1" />
              </View>
              <View className="flex-1">
                <Text className="text-gray-500 text-sm">Last Updated</Text>
                <Text className="text-gray-800 font-medium">
                  {createdAtFormatted(seller.updatedAt as unknown as Timestamp)}
                </Text>
              </View>
            </View>
          </View>

          {/* Store Information */}
          {store && (
            <View className="mt-4 pt-4 border-t border-gray-200">
              <View className="flex-row items-center justify-between mb-3">
                <Text className="text-gray-700 font-semibold text-lg">
                  Store Information
                </Text>
                <View
                  className={`px-3 py-1 rounded-full ${storeStatusConfig?.bgColor}`}
                >
                  <View className="flex-row items-center">
                    <MaterialIcons
                      name={storeStatusConfig?.icon}
                      size={14}
                      color={storeStatusConfig?.textColor}
                    />
                    <Text
                      className="ml-1 text-sm font-medium"
                      style={{ color: storeStatusConfig?.textColor }}
                    >
                      {storeStatusConfig?.text}
                    </Text>
                  </View>
                </View>
              </View>

              <View className="flex-row items-center gap-3 mb-2">
                <View className="bg-orange-50 p-2 rounded-full">
                  <MaterialIcons name="store" size={20} color="#F97316" />
                </View>
                <View className="flex-1">
                  <Text className="text-gray-500 text-sm">Store Name</Text>
                  <Text className="text-gray-800 font-medium">
                    {store.store}
                  </Text>
                </View>
              </View>

              <View className="flex-row items-center gap-3">
                <View className="bg-teal-50 p-2 rounded-full">
                  <MaterialIcons name="place" size={20} color="#14B8A6" />
                </View>
                <View className="flex-1">
                  <Text className="text-gray-500 text-sm">Store Address</Text>
                  <Text className="text-gray-800 font-medium">
                    {store.address}
                  </Text>
                </View>
              </View>
            </View>
          )}

          {/* Action Arrow */}
          <View className="flex-row justify-end mt-4 pt-4 border-t border-gray-200">
            <View className="flex-row items-center">
              <Text className="text-blue-600 text-sm font-medium mr-2">
                View Details
              </Text>
              <MaterialIcons name="arrow-forward" size={16} color="#3B82F6" />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  )
}

export default SellerCard
