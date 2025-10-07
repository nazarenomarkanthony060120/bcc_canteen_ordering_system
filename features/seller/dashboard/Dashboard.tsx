import React, { useState, useRef, useEffect } from 'react'
import {
  View,
  ScrollView,
  RefreshControl,
  Animated,
  TouchableOpacity,
  Text,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { BlurView } from 'expo-blur'
import { MaterialIcons, Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useAuth } from '@/context/auth'
import { useFetchStoreByUserId } from '@/hooks/useQuery/common/fetch/useFetchStoreByUserId'
import { useGetUserByUserId } from '@/hooks/useQuery/common/get/useGetUserByUserId'
import Seller from '../Seller'
import Typo from '@/components/common/typo'
import LoadingIndicator from '@/features/common/components/loadingIndicator/LoadingIndicator'
import SellerDashboardSkeleton from './components/skeletons/SellerDashboardSkeleton'
import { StoreStatus } from '@/utils/types'
import DashboardHeader from '@/features/common/components/dashboard/components/DashboardHeader'

const Dashboard = () => {
  const [refreshing, setRefreshing] = useState(false)
  const router = useRouter()
  const auth = useAuth()

  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(50)).current
  const scaleAnim = useRef(new Animated.Value(0.95)).current

  const {
    data: user,
    refetch: refetchUser,
    isLoading: isLoadingUser,
  } = useGetUserByUserId({
    id: auth.user?.uid,
  })

  const {
    data: stores,
    isLoading: isLoadingStores,
    refetch: refetchStores,
  } = useFetchStoreByUserId({
    id: auth.user?.uid,
  })

  useEffect(() => {
    if (!isLoadingStores && !isLoadingUser) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start()
    }
  }, [isLoadingStores, isLoadingUser])

  const onRefresh = async () => {
    setRefreshing(true)
    try {
      await Promise.all([refetchUser(), refetchStores()])
    } finally {
      setRefreshing(false)
    }
  }

  const handleViewAllStores = () => {
    router.push('/screens/common/viewAllStores' as any)
  }

  const handleStorePress = (storeId: string) => {
    router.push(`/screens/(seller)/my-store/myStore?storeId=${storeId}`)
  }

  const getStatusColor = (status: StoreStatus) => {
    switch (status) {
      case StoreStatus.APPROVED:
        return 'bg-emerald-100 text-emerald-700'
      case StoreStatus.PENDING:
        return 'bg-yellow-100 text-yellow-700'
      case StoreStatus.APPLIED:
        return 'bg-blue-100 text-blue-700'
      case StoreStatus.REJECTED:
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusText = (status: StoreStatus) => {
    switch (status) {
      case StoreStatus.APPROVED:
        return 'Active'
      case StoreStatus.PENDING:
        return 'Pending'
      case StoreStatus.APPLIED:
        return 'Applied'
      case StoreStatus.REJECTED:
        return 'Rejected'
      default:
        return 'Unknown'
    }
  }

  // Check if we're in initial loading state (not refreshing)
  const isInitialLoading = !refreshing && (isLoadingStores || isLoadingUser)

  // Show skeleton during initial loading
  if (isInitialLoading) {
    return <SellerDashboardSkeleton />
  }

  return (
    <Seller className="flex-1">
      <LinearGradient
        colors={['#F0FDF4', '#FFFFFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="flex-1"
      >
        <SafeAreaView className="flex-1">
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
            className="flex-1"
          >
            <ScrollView
              className="flex-1"
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  tintColor="#10B981"
                  colors={['#10B981']}
                  progressBackgroundColor="#ffffff"
                />
              }
            >
              <DashboardHeader />
              <View className="p-6">
                {/* Header */}
                <View className="mb-8">
                  <Typo className="text-3xl font-bold text-gray-800 mb-2">
                    My Stores
                  </Typo>
                  <Typo className="text-gray-600 text-base">
                    Manage your store listings and view marketplace
                  </Typo>
                </View>

                {/* Stats Cards */}
                <View className="flex-row justify-between mb-6">
                  <Animated.View
                    style={{
                      transform: [{ scale: scaleAnim }],
                    }}
                    className="flex-1 mr-2"
                  >
                    <BlurView
                      intensity={20}
                      tint="light"
                      className="rounded-2xl overflow-hidden"
                    >
                      <View className="bg-white/90 p-4 items-center">
                        <View className="bg-emerald-100 p-3 rounded-full mb-2">
                          <MaterialIcons
                            name="store"
                            size={24}
                            color="#10B981"
                          />
                        </View>
                        <Typo className="text-2xl font-bold text-gray-800">
                          {stores?.length || 0}
                        </Typo>
                        <Typo className="text-gray-600 text-sm">My Stores</Typo>
                      </View>
                    </BlurView>
                  </Animated.View>

                  <Animated.View
                    style={{
                      transform: [{ scale: scaleAnim }],
                    }}
                    className="flex-1 ml-2"
                  >
                    <BlurView
                      intensity={20}
                      tint="light"
                      className="rounded-2xl overflow-hidden"
                    >
                      <View className="bg-white/90 p-4 items-center">
                        <View className="bg-blue-100 p-3 rounded-full mb-2">
                          <MaterialIcons
                            name="storefront"
                            size={24}
                            color="#3B82F6"
                          />
                        </View>
                        <Typo className="text-2xl font-bold text-gray-800">
                          {stores?.filter(
                            (store) => store.status === StoreStatus.APPROVED,
                          ).length || 0}
                        </Typo>
                        <Typo className="text-gray-600 text-sm">Active</Typo>
                      </View>
                    </BlurView>
                  </Animated.View>
                </View>

                {/* My Stores Section */}
                <View className="mb-6">
                  <View className="flex-row items-center justify-between mb-4">
                    <Typo className="text-xl font-semibold text-gray-800">
                      Your Stores
                    </Typo>
                    <TouchableOpacity
                      onPress={handleViewAllStores}
                      className="flex-row items-center"
                    >
                      <Typo className="text-emerald-600 font-medium mr-1">
                        View All Stores
                      </Typo>
                      <Ionicons
                        name="chevron-forward"
                        size={18}
                        color="#10B981"
                      />
                    </TouchableOpacity>
                  </View>

                  <BlurView
                    intensity={15}
                    tint="light"
                    className="rounded-3xl overflow-hidden"
                  >
                    <View className="bg-white/90 p-4">
                      {stores && stores.length > 0 ? (
                        stores.slice(0, 3).map((store, index) => (
                          <TouchableOpacity
                            key={store.id}
                            onPress={() => handleStorePress(store.id)}
                            className={`flex-row items-center p-4 rounded-2xl ${
                              index < stores.slice(0, 3).length - 1
                                ? 'mb-3'
                                : ''
                            }`}
                            style={{
                              backgroundColor: '#fff',
                              shadowColor: '#000',
                              shadowOffset: { width: 0, height: 2 },
                              shadowOpacity: 0.1,
                              shadowRadius: 8,
                              elevation: 4,
                            }}
                          >
                            <View className="bg-emerald-50 p-3 rounded-xl mr-4">
                              <MaterialIcons
                                name="store"
                                size={28}
                                color="#10B981"
                              />
                            </View>
                            <View className="flex-1">
                              <Typo className="text-lg font-semibold text-gray-800 mb-1">
                                {store.store}
                              </Typo>
                              {store.stall && (
                                <Typo className="text-lg font-semibold text-gray-800 mb-1">
                                  Stall #:{store.stall}
                                </Typo>
                              )}
                              <Typo className="text-gray-600 text-sm mb-2">
                                {store.address}
                              </Typo>
                              <View
                                className={`px-3 py-1 rounded-full self-start ${getStatusColor(store.status)}`}
                              >
                                <Typo className="text-xs font-medium">
                                  {getStatusText(store.status)}
                                </Typo>
                              </View>
                            </View>
                            <Ionicons
                              name="chevron-forward"
                              size={20}
                              color="#9CA3AF"
                            />
                          </TouchableOpacity>
                        ))
                      ) : (
                        <View className="items-center py-8">
                          <View className="bg-gray-100 p-6 rounded-full mb-4">
                            <MaterialIcons
                              name="store"
                              size={48}
                              color="#9CA3AF"
                            />
                          </View>
                          <Typo className="text-gray-600 text-lg font-medium mb-2">
                            No stores yet
                          </Typo>
                          <Typo className="text-gray-500 text-sm text-center">
                            Create your first store to start selling
                          </Typo>
                        </View>
                      )}
                    </View>
                  </BlurView>
                </View>

                {/* View All Stores Button */}
                {/* <TouchableOpacity
                  onPress={handleViewAllStores}
                  className="mb-6"
                  style={{
                    shadowColor: '#10B981',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 12,
                    elevation: 8,
                  }}
                >
                  <BlurView
                    intensity={20}
                    tint="light"
                    className="rounded-2xl overflow-hidden"
                  >
                    <LinearGradient
                      colors={['#10B981', '#059669']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      className="p-4"
                    >
                      <View className="flex-row items-center justify-center">
                        <MaterialIcons
                          name="storefront"
                          size={24}
                          color="#FFFFFF"
                        />
                        <Typo className="text-white text-lg font-semibold ml-3">
                          Browse All Stores
                        </Typo>
                        <Ionicons
                          name="arrow-forward"
                          size={24}
                          color="#FFFFFF"
                        />
                      </View>
                    </LinearGradient>
                  </BlurView>
                </TouchableOpacity> */}
              </View>
            </ScrollView>
          </Animated.View>
        </SafeAreaView>
      </LinearGradient>
    </Seller>
  )
}

export default Dashboard
