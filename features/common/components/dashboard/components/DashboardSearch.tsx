import React, { useState, useRef, useEffect } from 'react'
import {
  View,
  TextInput,
  TouchableOpacity,
  Animated,
  Pressable,
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import Typo from '@/components/common/typo'
import { BlurView } from 'expo-blur'
import { useFetchAllStores } from '@/hooks/useQuery/common/fetch/useFetchAllStores'
import { useFetchAllPopularFoods } from '@/hooks/useQuery/common/fetch/useFetchAllPopularFoods'
import { useFetchNewlyAddedFoods } from '@/hooks/useQuery/common/fetch/useFetchNewlyAddedFoods'
import { Food, Store, StoreStatus } from '@/utils/types'
import { useRouter } from 'expo-router'

interface DashboardSearchProps {
  onSearch: (text: string) => void
  onFilter: () => void
}

type SearchResult = {
  type: 'food' | 'store'
  item: Food | Store
  category: 'popular' | 'new' | 'store'
}

const DashboardSearch = ({ onSearch, onFilter }: DashboardSearchProps) => {
  const router = useRouter()
  const [isFocused, setIsFocused] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [showResults, setShowResults] = useState(false)
  const scaleAnim = useRef(new Animated.Value(1)).current
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(20)).current

  const { data: stores, isLoading: isLoadingStores } = useFetchAllStores()
  const { data: popularFoods, isLoading: isLoadingPopularFoods } =
    useFetchAllPopularFoods()
  const { data: newlyAddedFoods, isLoading: isLoadingNewlyAddedFoods } =
    useFetchNewlyAddedFoods()

  // Debug logs for data fetching
  useEffect(() => {
    console.log('Stores:', stores?.length)
    console.log('Popular Foods:', popularFoods?.length)
    console.log('Newly Added Foods:', newlyAddedFoods?.length)
  }, [stores, popularFoods, newlyAddedFoods])

  // Handle search text changes
  useEffect(() => {
    if (searchText.trim() === '') {
      setSearchResults([])
      setShowResults(false)
      return
    }

    const results: SearchResult[] = []
    const searchLower = searchText.toLowerCase()

    // Get approved store IDs
    const approvedStoreIds =
      stores
        ?.filter((store) => store.status === StoreStatus.APPROVED)
        .map((store) => store.id) || []

    // Search in approved stores
    if (stores) {
      stores.forEach((store) => {
        if (
          store.status === StoreStatus.APPROVED &&
          store.store.toLowerCase().includes(searchLower)
        ) {
          results.push({ type: 'store', item: store, category: 'store' })
        }
      })
    }

    // Search in popular foods from approved stores
    if (popularFoods) {
      popularFoods.forEach((food) => {
        if (
          approvedStoreIds.includes(food.storeId) &&
          (food.name.toLowerCase().includes(searchLower) ||
            food.description?.toLowerCase().includes(searchLower))
        ) {
          results.push({ type: 'food', item: food, category: 'popular' })
        }
      })
    }

    // Search in newly added foods from approved stores
    if (newlyAddedFoods) {
      newlyAddedFoods.forEach((food) => {
        if (
          approvedStoreIds.includes(food.storeId) &&
          (food.name.toLowerCase().includes(searchLower) ||
            food.description?.toLowerCase().includes(searchLower))
        ) {
          // Check if this food is already in results
          const isDuplicate = results.some(
            (result) => result.type === 'food' && result.item.id === food.id,
          )
          if (!isDuplicate) {
            results.push({ type: 'food', item: food, category: 'new' })
          }
        }
      })
    }

    console.log('Search Results:', results.length)
    setSearchResults(results)
    setShowResults(true)
  }, [searchText, stores, popularFoods, newlyAddedFoods])

  const handleFocus = () => {
    setIsFocused(true)
    Animated.spring(scaleAnim, {
      toValue: 1.02,
      useNativeDriver: true,
    }).start()
  }

  const handleBlur = () => {
    setIsFocused(false)
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start()
    // Delay hiding results to allow for clicking on them
    setTimeout(() => setShowResults(false), 200)
  }

  const handleSearch = (text: string) => {
    console.log('Search Text:', text)
    setSearchText(text)
    onSearch(text)
  }

  const handleClearSearch = () => {
    setSearchText('')
    setSearchResults([])
    setShowResults(false)
    onSearch('')
  }

  const handleResultPress = (result: SearchResult) => {
    if (result.type === 'food') {
      const food = result.item as Food
      router.push(`/screens/common/viewFood?foodId=${food.id}`)
    } else {
      const store = result.item as Store
      router.push(`/screens/common/viewStore?storeId=${store.id}`)
    }
    handleClearSearch()
  }

  const getCategoryIcon = (category: SearchResult['category']) => {
    switch (category) {
      case 'popular':
        return 'star'
      case 'new':
        return 'new-releases'
      case 'store':
        return 'store'
      default:
        return 'restaurant'
    }
  }

  const getCategoryColor = (category: SearchResult['category']) => {
    switch (category) {
      case 'popular':
        return '#F59E0B'
      case 'new':
        return '#10B981'
      case 'store':
        return '#3B82F6'
      default:
        return '#10B981'
    }
  }

  // Show loading state if data is being fetched
  if (isLoadingStores || isLoadingPopularFoods || isLoadingNewlyAddedFoods) {
    return (
      <View className="mb-6">
        <BlurView intensity={10} className="rounded-2xl overflow-hidden">
          <View className="bg-white/90 p-4">
            <View className="flex-row items-center">
              <View className="flex-1 flex-row items-center bg-gray-50 rounded-xl px-4 py-3">
                <MaterialIcons name="search" size={24} color="#9CA3AF" />
                <TextInput
                  className="flex-1 ml-2 text-gray-800"
                  placeholder="Loading search data..."
                  placeholderTextColor="#9CA3AF"
                  editable={false}
                />
              </View>
            </View>
          </View>
        </BlurView>
      </View>
    )
  }

  return (
    <View className="mb-6">
      <Animated.View
        style={{
          transform: [{ scale: scaleAnim }],
        }}
      >
        <BlurView intensity={10} className="rounded-2xl overflow-hidden">
          <View className="bg-white/90 p-4">
            <View className="flex-row items-center">
              <View className="flex-1 flex-row items-center bg-gray-50 rounded-xl px-4 py-3">
                <MaterialIcons
                  name="search"
                  size={24}
                  color={isFocused ? '#10B981' : '#9CA3AF'}
                />
                <TextInput
                  className="flex-1 ml-2 text-gray-800"
                  placeholder="Search for food or stores..."
                  placeholderTextColor="#9CA3AF"
                  value={searchText}
                  onChangeText={handleSearch}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                {searchText.length > 0 && (
                  <TouchableOpacity onPress={handleClearSearch}>
                    <MaterialIcons name="close" size={20} color="#9CA3AF" />
                  </TouchableOpacity>
                )}
              </View>
              <TouchableOpacity
                className="ml-3 bg-emerald-50 p-3 rounded-xl"
                onPress={onFilter}
              >
                <MaterialIcons name="filter-list" size={24} color="#10B981" />
              </TouchableOpacity>
            </View>

            {showResults && searchResults.length > 0 && (
              <View className="mt-3 bg-white rounded-xl shadow-lg overflow-hidden">
                {searchResults.map((result, index) => (
                  <Pressable
                    key={`${result.type}-${result.item.id}`}
                    onPress={() => handleResultPress(result)}
                    className={`p-3 flex-row items-center ${
                      index !== searchResults.length - 1
                        ? 'border-b border-gray-100'
                        : ''
                    }`}
                  >
                    <View
                      className="p-2 rounded-full mr-3"
                      style={{
                        backgroundColor: `${getCategoryColor(result.category)}20`,
                      }}
                    >
                      <MaterialIcons
                        name={getCategoryIcon(result.category)}
                        size={20}
                        color={getCategoryColor(result.category)}
                      />
                    </View>
                    <View className="flex-1">
                      <View className="flex-row items-center">
                        <Typo className="text-gray-800 font-medium">
                          {result.type === 'food'
                            ? (result.item as Food).name
                            : (result.item as Store).store}
                        </Typo>
                        <View
                          className="ml-2 px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: `${getCategoryColor(result.category)}20`,
                          }}
                        >
                          <Typo
                            className="text-xs"
                            style={{ color: getCategoryColor(result.category) }}
                          >
                            {result.category === 'popular'
                              ? 'Popular'
                              : result.category === 'new'
                                ? 'New'
                                : 'Store'}
                          </Typo>
                        </View>
                      </View>
                      {result.type === 'food' && (
                        <Typo className="text-gray-500 text-sm mt-1">
                          {(result.item as Food).description?.substring(0, 50)}
                          ...
                        </Typo>
                      )}
                    </View>
                  </Pressable>
                ))}
              </View>
            )}

            {isFocused && (
              <View className="mt-3 flex-row">
                <TouchableOpacity className="bg-emerald-50 px-3 py-1 rounded-full mr-2">
                  <Typo className="text-emerald-600 text-sm">Popular</Typo>
                </TouchableOpacity>
                <TouchableOpacity className="bg-emerald-50 px-3 py-1 rounded-full mr-2">
                  <Typo className="text-emerald-600 text-sm">Recent</Typo>
                </TouchableOpacity>
                <TouchableOpacity className="bg-emerald-50 px-3 py-1 rounded-full">
                  <Typo className="text-emerald-600 text-sm">Nearby</Typo>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </BlurView>
      </Animated.View>
    </View>
  )
}

export default DashboardSearch
