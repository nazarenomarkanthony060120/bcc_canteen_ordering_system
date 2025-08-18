import React, { useState, useRef, useEffect } from 'react'
import {
  View,
  ScrollView,
  RefreshControl,
  Animated,
  TouchableOpacity,
  TextInput,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { BlurView } from 'expo-blur'
import { MaterialIcons, Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { MasonryFlashList } from '@shopify/flash-list'
import ScreenLayout from '../screenLayout/ScreenLayout'
import Typo from '@/components/common/typo'
import LoadingIndicator from '../loadingIndicator/LoadingIndicator'
import { useFetchAllStoresByStatus } from '@/hooks/useQuery/common/fetch/useFetchAllStoresByStatus'
import { Store } from '@/utils/types'

const ViewAllStores = () => {
  const [refreshing, setRefreshing] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(30)).current

  const { data: stores, isLoading, refetch } = useFetchAllStoresByStatus()

  useEffect(() => {
    if (!isLoading) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start()
    }
  }, [isLoading])

  const onRefresh = async () => {
    setRefreshing(true)
    try {
      await refetch()
    } finally {
      setRefreshing(false)
    }
  }

  const handleStorePress = (storeId: string) => {
    router.push(`/screens/common/viewStore?storeId=${storeId}`)
  }

  const handleBack = () => {
    router.back()
  }

  const filteredStores =
    stores?.filter(
      (store) =>
        store.store.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.address.toLowerCase().includes(searchQuery.toLowerCase()),
    ) || []

  const renderStoreCard = ({ item: store }: { item: Store }) => (
    <TouchableOpacity
      onPress={() => handleStorePress(store.id)}
      className="mb-4"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
      }}
    >
      <BlurView
        intensity={20}
        tint="light"
        className="rounded-3xl overflow-hidden"
      >
        <View className="bg-white/90 p-5">
          <View className="flex-row items-center mb-4">
            <View className="bg-emerald-50 p-4 rounded-2xl mr-4">
              <MaterialIcons name="store" size={32} color="#10B981" />
            </View>
            <View className="flex-1">
              <Typo className="text-xl font-bold text-gray-800 mb-1">
                {store.store}
              </Typo>
              <View className="flex-row items-center">
                <MaterialIcons name="location-on" size={16} color="#6B7280" />
                <Typo className="text-gray-600 ml-1 flex-1">
                  {store.address}
                </Typo>
              </View>
            </View>
            <View className="bg-emerald-100 px-3 py-1 rounded-full">
              <Typo className="text-emerald-700 text-xs font-medium">
                Active
              </Typo>
            </View>
          </View>

          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <MaterialIcons name="star" size={16} color="#F59E0B" />
              <Typo className="text-gray-600 ml-1 text-sm">Approved Store</Typo>
            </View>
            <View className="flex-row items-center">
              <Typo className="text-emerald-600 font-medium mr-2">
                View Menu
              </Typo>
              <Ionicons name="chevron-forward" size={18} color="#10B981" />
            </View>
          </View>
        </View>
      </BlurView>
    </TouchableOpacity>
  )

  const renderEmptyState = () => (
    <View className="flex-1 items-center justify-center px-6 py-12">
      <View className="bg-gray-50 p-8 rounded-3xl items-center">
        <View className="bg-gray-100 p-6 rounded-full mb-4">
          <MaterialIcons name="search-off" size={48} color="#9CA3AF" />
        </View>
        <Typo className="text-gray-600 text-xl font-semibold mb-2">
          No stores found
        </Typo>
        <Typo className="text-gray-500 text-center">
          {searchQuery
            ? `No stores match "${searchQuery}"`
            : 'No approved stores available at the moment'}
        </Typo>
      </View>
    </View>
  )

  if (isLoading && !refreshing) return <LoadingIndicator />

  return (
    <ScreenLayout>
      <LinearGradient
        colors={['#F0FDF4', '#FFFFFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="flex-1"
      >
        <SafeAreaView className="flex-1">
          {/* Header */}
          <View className="px-6 pt-4 pb-2">
            <View className="flex-row items-center justify-between mb-6">
              <TouchableOpacity
                onPress={handleBack}
                className="flex-row items-center"
              >
                <View className="bg-white/90 p-3 rounded-full mr-3 shadow-sm">
                  <Ionicons name="chevron-back" size={24} color="#10B981" />
                </View>
                <Typo className="text-emerald-600 font-medium">Back</Typo>
              </TouchableOpacity>

              <View className="bg-emerald-100 px-4 py-2 rounded-full">
                <Typo className="text-emerald-700 font-medium">
                  {filteredStores.length} Stores
                </Typo>
              </View>
            </View>

            <View className="mb-4">
              <Typo className="text-3xl font-bold text-gray-800 mb-2">
                All Stores
              </Typo>
              <Typo className="text-gray-600">
                Discover amazing food from approved vendors
              </Typo>
            </View>

            {/* Search Bar */}
            <BlurView
              intensity={15}
              tint="light"
              className="rounded-2xl overflow-hidden mb-4"
            >
              <View className="bg-white/90 flex-row items-center p-4">
                <MaterialIcons name="search" size={24} color="#9CA3AF" />
                <TextInput
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholder="Search stores by name or location..."
                  className="flex-1 ml-3 text-gray-800 text-base"
                  placeholderTextColor="#9CA3AF"
                />
                {searchQuery.length > 0 && (
                  <TouchableOpacity onPress={() => setSearchQuery('')}>
                    <MaterialIcons name="clear" size={20} color="#9CA3AF" />
                  </TouchableOpacity>
                )}
              </View>
            </BlurView>
          </View>

          {/* Stores List */}
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
            className="flex-1"
          >
            <MasonryFlashList
              data={filteredStores}
              renderItem={renderStoreCard}
              estimatedItemSize={120}
              numColumns={1}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                padding: 24,
                paddingTop: 8,
              }}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  tintColor="#10B981"
                  colors={['#10B981']}
                  progressBackgroundColor="#ffffff"
                />
              }
              ListEmptyComponent={renderEmptyState}
            />
          </Animated.View>
        </SafeAreaView>
      </LinearGradient>
    </ScreenLayout>
  )
}

export default ViewAllStores
