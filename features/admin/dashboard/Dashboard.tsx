import React, { useRef, useEffect, useState, useCallback } from 'react'
import {
  ScrollView,
  RefreshControl,
  Animated,
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { MaterialIcons } from '@expo/vector-icons'
import { FlashList } from '@shopify/flash-list'
import Admin from '../Admin'
import { useAuth } from '@/context/auth'
import { useFetchAllMembers } from '@/hooks/useQuery/admin/members/useFetchAllMembers'
import { UserKYCStatus } from '@/utils/types'
import LoadingIndicator from '@/features/common/components/loadingIndicator/LoadingIndicator'
import SellerCard from './components/SellerCard'
import EmptyState from './components/EmptyState'
import FromDashboardHeader from './components/DashboardHeader'
import DashboardHeader from '@/features/common/components/dashboard/components/DashboardHeader'
import { router } from 'expo-router'

const Dashboard: React.FC = () => {
  const auth = useAuth()
  const [refreshing, setRefreshing] = useState(false)
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(20)).current

  const {
    data: sellers,
    isLoading,
    error,
    refetch,
  } = useFetchAllMembers({
    id: auth.user?.uid,
  })

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    try {
      await refetch()
    } catch (error) {
      console.error('Error refreshing sellers:', error)
    } finally {
      setRefreshing(false)
    }
  }, [refetch])

  // Calculate statistics
  const statistics = React.useMemo(() => {
    if (!sellers) return { total: 0, active: 0, applied: 0, disabled: 0 }

    const total = sellers.length
    const active = sellers.filter(
      (seller) => seller.status === UserKYCStatus.APPROVED,
    ).length
    const applied = sellers.filter(
      (seller) => seller.status === UserKYCStatus.APPLIED,
    ).length
    const disabled = sellers.filter(
      (seller) =>
        seller.status === UserKYCStatus.DISABLED ||
        seller.status === UserKYCStatus.REJECTED,
    ).length

    return { total, active, applied, disabled }
  }, [sellers])

  if (isLoading && !refreshing) {
    return <LoadingIndicator />
  }

  if (error) {
    return (
      <Admin className="flex-1">
        <LinearGradient
          colors={['#6a11cb', '#2575fc']}
          style={{ flex: 1 }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <SafeAreaView className="flex-1 p-5">
            <View className="flex-1 justify-center items-center">
              <View className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 items-center border border-white/30">
                <View className="bg-red-100 p-6 rounded-full mb-4">
                  <MaterialIcons name="error" size={48} color="#EF4444" />
                </View>
                <Text className="text-red-600 text-xl font-semibold mb-2">
                  Error Loading Data
                </Text>
                <Text className="text-gray-600 text-center text-base">
                  Failed to load seller information. Please try again.
                </Text>
              </View>
            </View>
          </SafeAreaView>
        </LinearGradient>
      </Admin>
    )
  }

  return (
    <Admin className="flex-1">
      <LinearGradient
        colors={['#F0FDF4', '#FFFFFF']}
        className="flex-1"
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <SafeAreaView className="flex-1">
          <ScrollView
            showsVerticalScrollIndicator={false}
            className="p-5"
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor="#ffffff"
                colors={['#ffffff']}
                progressBackgroundColor="#ffffff"
              />
            }
          >
            <Animated.View
              style={{
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              }}
            >
              <DashboardHeader />
              <FromDashboardHeader
                totalSellers={statistics.total}
                activeSellers={statistics.active}
                appliedSellers={statistics.applied}
                disabledSellers={statistics.disabled}
              />
              <TouchableOpacity
                onPress={() =>
                  router.push('/screens/(admin)/seller/create-seller-account')
                }
                className="rounded-2xl mb-4 shadow-lg active:scale-98 transform transition-all duration-200"
              >
                <View className="flex-row bg-green-500 rounded-lg items-center justify-center gap-3 p-4">
                  <View className="bg-white/15 p-2 rounded-full backdrop-blur-sm">
                    <MaterialIcons name="person-add" size={20} color="white" />
                  </View>
                  <Text className="text-white text-base font-semibold tracking-wide">
                    Create Seller Account
                  </Text>
                  <MaterialIcons name="arrow-forward" size={18} color="white" />
                </View>
              </TouchableOpacity>
              <View className=" backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden border border-white/30">
                <View className="p-4">
                  <View className="flex-row items-center justify-between mb-4">
                    <View className="flex-row items-center gap-3">
                      <MaterialIcons name="people" size={24} color="#000" />
                      <Text className="text-xl font-bold text-black">
                        Seller Information
                      </Text>
                    </View>
                    <View className="bg-blue-50 px-3 py-1 rounded-full">
                      <Text className="text-blue-600 text-sm font-medium">
                        {statistics.total} Total
                      </Text>
                    </View>
                  </View>

                  {sellers && sellers.length > 0 ? (
                    <View style={{ minHeight: 200 }}>
                      <FlashList
                        data={sellers}
                        renderItem={({ item, index }) => (
                          <SellerCard
                            seller={item}
                            fadeAnim={fadeAnim}
                            slideAnim={slideAnim}
                            index={index}
                          />
                        )}
                        keyExtractor={(item) => item.id}
                        estimatedItemSize={300}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 20 }}
                        scrollEnabled={false}
                      />
                    </View>
                  ) : (
                    <EmptyState />
                  )}
                </View>
              </View>
            </Animated.View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </Admin>
  )
}

export default Dashboard
