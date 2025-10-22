import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native'
import React, { useMemo, useState } from 'react'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { BarChart } from 'react-native-chart-kit'
import { LinearGradient } from 'expo-linear-gradient'
import { BlurView } from 'expo-blur'
import { useGetHistories } from '@/hooks/useQuery/seller/get/useGetHistories'
import { useFetchFoodByStoreId } from '@/hooks/useQuery/common/get/useFetchFoodByStoreId'
import {
  format,
  subDays,
  subMonths,
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
} from 'date-fns'
import { useAuth } from '@/context/auth'
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated'
import SummaryCard from './components/SummaryCard'
import SalesChart from './components/SalesChart'
import TimeRangeIndicator from './components/TimeRangeIndicator'
import { FoodType } from '@/utils/types'
import { documentDirectory, writeAsStringAsync, EncodingType } from 'expo-file-system'
import * as Sharing from 'expo-sharing'

const { width } = Dimensions.get('window')

type TimeFilter = 'day' | 'week' | 'month'
type CategoryFilter = FoodType | 'All'

interface ViewAnalyticsProps {
  storeId: string | null
}
const ViewAnalytics = ({ storeId }: ViewAnalyticsProps) => {
  const { user } = useAuth()
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('day')
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('All')
  const {
    data: histories,
    isLoading,
    error,
  } = useGetHistories({ storeId: storeId })

  const { data: foods, isLoading: isLoadingFoods } = useFetchFoodByStoreId({
    id: storeId,
  })

  console.log('Histories:', histories) // Debug log
  console.log('Foods:', foods) // Debug log
  console.log('error, ', error)

  const filteredHistories = useMemo(() => {
    if (!histories) return []

    const now = new Date()
    const startDate = (() => {
      switch (timeFilter) {
        case 'day':
          return startOfDay(now)
        case 'week':
          return startOfWeek(now)
        case 'month':
          return startOfMonth(now)
      }
    })()

    const endDate = (() => {
      switch (timeFilter) {
        case 'day':
          return endOfDay(now)
        case 'week':
          return endOfWeek(now)
        case 'month':
          return endOfMonth(now)
      }
    })()

    return histories.filter((history) => {
      const historyDate = history.createdAt.toDate()
      return historyDate >= startDate && historyDate <= endDate
    })
  }, [histories, timeFilter])

  const stats = useMemo(() => {
    if (!histories || histories.length === 0 || !foods) {
      console.log('No histories data available')
      return {
        totalSales: 0,
        totalOrders: 0,
        averageOrderValue: 0,
        growth: 0,
      }
    }

    // Filter histories by category
    const categoryFilteredHistories = categoryFilter === 'All' 
      ? histories 
      : histories.filter((history) => {
          const food = foods.find((f) => f.id === history.foodId)
          return food?.type === categoryFilter
        })

    const now = new Date()
    let currentPeriodStart: Date
    let previousPeriodStart: Date
    let currentPeriodEnd: Date
    let previousPeriodEnd: Date

    switch (timeFilter) {
      case 'day':
        currentPeriodStart = startOfDay(now)
        currentPeriodEnd = endOfDay(now)
        previousPeriodStart = startOfDay(subDays(now, 1))
        previousPeriodEnd = endOfDay(subDays(now, 1))
        break
      case 'week':
        currentPeriodStart = startOfWeek(now)
        currentPeriodEnd = endOfWeek(now)
        previousPeriodStart = startOfWeek(subDays(now, 7))
        previousPeriodEnd = endOfWeek(subDays(now, 7))
        break
      case 'month':
        currentPeriodStart = startOfMonth(now)
        currentPeriodEnd = endOfMonth(now)
        previousPeriodStart = startOfMonth(subMonths(now, 1))
        previousPeriodEnd = endOfMonth(subMonths(now, 1))
        break
    }

    // Calculate current period sales
    const currentPeriodSales = categoryFilteredHistories.reduce((sum, history) => {
      const historyDate = history.createdAt.toDate()
      if (
        historyDate >= currentPeriodStart &&
        historyDate <= currentPeriodEnd
      ) {
        return sum + history.totalPrice
      }
      return sum
    }, 0)

    // Calculate previous period sales
    const previousPeriodSales = categoryFilteredHistories.reduce((sum, history) => {
      const historyDate = history.createdAt.toDate()
      if (
        historyDate >= previousPeriodStart &&
        historyDate <= previousPeriodEnd
      ) {
        return sum + history.totalPrice
      }
      return sum
    }, 0)

    console.log('Growth calculation:', {
      timeFilter,
      categoryFilter,
      currentPeriod: {
        start: currentPeriodStart.toISOString(),
        end: currentPeriodEnd.toISOString(),
        sales: currentPeriodSales,
      },
      previousPeriod: {
        start: previousPeriodStart.toISOString(),
        end: previousPeriodEnd.toISOString(),
        sales: previousPeriodSales,
      },
    })

    const totalOrders = categoryFilteredHistories.filter((history) => {
      const historyDate = history.createdAt.toDate()
      return (
        historyDate >= currentPeriodStart && historyDate <= currentPeriodEnd
      )
    }).length

    const averageOrderValue =
      totalOrders > 0 ? currentPeriodSales / totalOrders : 0

    // Calculate growth percentage
    let growth = 0
    if (previousPeriodSales > 0) {
      growth =
        ((currentPeriodSales - previousPeriodSales) / previousPeriodSales) * 100
    } else if (currentPeriodSales > 0) {
      growth = 100 // If there were no sales in previous period but there are sales now, that's 100% growth
    }

    return {
      totalSales: currentPeriodSales,
      totalOrders,
      averageOrderValue,
      growth,
    }
  }, [histories, timeFilter, categoryFilter, foods])

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(5, 150, 105, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#059669',
    },
    formatYLabel: (value: string) => {
      const num = parseFloat(value)
      return num >= 1000 ? `${(num / 1000).toFixed(0)}k` : num.toFixed(0)
    },
    formatXLabel: (value: string) => value,
    yAxisInterval: 1,
    yAxisSuffix: '',
    yAxisLabel: '',
  }

  const lineData = useMemo(() => {
    if (
      !filteredHistories ||
      filteredHistories.length === 0 ||
      !foods ||
      foods.length === 0
    ) {
      console.log('No data for food orders chart')
      return {
        labels: ['No Data'],
        datasets: [{ data: [0] }],
      }
    }

    // Filter histories by category
    const categoryFilteredHistories = categoryFilter === 'All' 
      ? filteredHistories 
      : filteredHistories.filter((history) => {
          const food = foods.find((f) => f.id === history.foodId)
          return food?.type === categoryFilter
        })

    // Create a map of foodId to food name
    const foodMap = new Map(foods.map((food) => [food.id, food.name]))

    // Sum quantities per food item
    const foodOrderCounts = new Map<string, number>()

    categoryFilteredHistories.forEach((history) => {
      const foodName = foodMap.get(history.foodId) || 'Unknown'
      const currentCount = foodOrderCounts.get(foodName) || 0
      foodOrderCounts.set(foodName, currentCount + history.quantity)
    })

    // Sort by order count (descending) and take top items
    const sortedFoodOrders = Array.from(foodOrderCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8) // Show top 8 food items

    const labels = sortedFoodOrders.map(([foodName]) => {
      // Truncate long names for better display
      return foodName.length > 10 ? foodName.substring(0, 8) + '..' : foodName
    })

    const data = sortedFoodOrders.map(([, count]) => count)

    console.log('Food orders chart data:', { labels, data, category: categoryFilter })

    return {
      labels,
      datasets: [
        {
          data,
        },
      ],
    }
  }, [filteredHistories, foods, categoryFilter])

  const barData = useMemo(() => {
    if (!filteredHistories || filteredHistories.length === 0 || !foods) {
      console.log('No data for bar chart') // Debug log
      return {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{ data: [0, 0, 0, 0, 0, 0, 0] }],
      }
    }

    // Filter histories by category
    const categoryFilteredHistories = categoryFilter === 'All' 
      ? filteredHistories 
      : filteredHistories.filter((history) => {
          const food = foods.find((f) => f.id === history.foodId)
          return food?.type === categoryFilter
        })

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    const today = new Date()
    const startOfWeek = new Date(today)
    startOfWeek.setDate(today.getDate() - today.getDay() + 1)

    const weeklyData = days.map((_, index) => {
      const dayStart = new Date(startOfWeek)
      dayStart.setDate(startOfWeek.getDate() + index)
      const dayEnd = new Date(dayStart)
      dayEnd.setDate(dayStart.getDate() + 1)

      const dayOrders = categoryFilteredHistories.filter((history) => {
        const orderDate = history.createdAt.toDate()
        return orderDate >= dayStart && orderDate < dayEnd
      })

      return dayOrders.length
    })

    console.log('Bar chart data:', { labels: days, data: weeklyData, category: categoryFilter }) // Debug log

    return {
      labels: days,
      datasets: [
        {
          data: weeklyData,
        },
      ],
    }
  }, [filteredHistories, foods, categoryFilter])

  const statsData = [
    {
      title: 'Total Sales',
      value: `₱${stats.totalSales.toFixed(2)}`,
      icon: 'currency-php' as const,
      color: '#059669',
    },
    {
      title: 'Orders',
      value: stats.totalOrders.toString(),
      icon: 'shopping-cart' as const,
      color: '#2563eb',
    },
    {
      title: 'Avg. Order',
      value: `₱${stats.averageOrderValue.toFixed(2)}`,
      icon: 'people' as const,
      color: '#7c3aed',
    },
    {
      title: 'Growth',
      value: `${stats.growth.toFixed(1)}%`,
      icon: 'trending-up' as const,
      color: stats.growth >= 0 ? '#db2777' : '#ef4444',
    },
  ]

  const downloadCSV = async () => {
    try {
      if (!filteredHistories || filteredHistories.length === 0 || !foods) {
        Alert.alert('No Data', 'There is no data to export for the selected filters.')
        return
      }

      // Filter histories by category
      const categoryFilteredHistories = categoryFilter === 'All' 
        ? filteredHistories 
        : filteredHistories.filter((history) => {
            const food = foods.find((f) => f.id === history.foodId)
            return food?.type === categoryFilter
          })

      if (categoryFilteredHistories.length === 0) {
        Alert.alert('No Data', 'There is no data to export for the selected category.')
        return
      }

      // Create food map for easy lookup
      const foodMap = new Map(foods.map((food) => [food.id, { name: food.name, type: food.type }]))

      // CSV Header
      let csvContent = 'Order ID,Food Name,Category,Quantity,Total Price,Date,Time\n'

      // CSV Data
      categoryFilteredHistories.forEach((history) => {
        const foodInfo = foodMap.get(history.foodId)
        const foodName = foodInfo?.name || 'Unknown'
        const foodType = foodInfo?.type || 'Unknown'
        const orderDate = history.createdAt.toDate()
        const dateStr = format(orderDate, 'MM/dd/yyyy')
        const timeStr = format(orderDate, 'hh:mm a')
        
        csvContent += `${history.id},${foodName},${foodType},${history.quantity},₱${history.totalPrice.toFixed(2)},${dateStr},${timeStr}\n`
      })

      // Add summary section
      csvContent += '\n\nSUMMARY\n'
      csvContent += `Period,${timeFilter === 'day' ? 'Today' : timeFilter === 'week' ? 'This Week' : 'This Month'}\n`
      csvContent += `Category,${categoryFilter}\n`
      csvContent += `Total Sales,₱${stats.totalSales.toFixed(2)}\n`
      csvContent += `Total Orders,${stats.totalOrders}\n`
      csvContent += `Average Order Value,₱${stats.averageOrderValue.toFixed(2)}\n`
      csvContent += `Growth,${stats.growth.toFixed(1)}%\n`

      // Generate filename
      const timestamp = format(new Date(), 'yyyy-MM-dd_HHmmss')
      const fileName = `analytics_${timeFilter}_${categoryFilter}_${timestamp}.csv`
      const fileUri = `${documentDirectory}${fileName}`
      
      // Write file
      await writeAsStringAsync(fileUri, csvContent, {
        encoding: EncodingType.UTF8,
      })

      // Check if sharing is available
      const isAvailable = await Sharing.isAvailableAsync()
      if (isAvailable) {
        await Sharing.shareAsync(fileUri, {
          mimeType: 'text/csv',
          dialogTitle: 'Export Analytics Data',
          UTI: 'public.comma-separated-values-text',
        })
      } else {
        Alert.alert('Success', `CSV file saved to: ${fileUri}`)
      }
    } catch (error) {
      console.error('Error downloading CSV:', error)
      Alert.alert('Error', 'Failed to export CSV file. Please try again.')
    }
  }

  if (isLoading || isLoadingFoods) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <ActivityIndicator size="large" color="#059669" />
        <Text className="mt-4 text-gray-600">Loading analytics...</Text>
      </View>
    )
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <MaterialIcons name="error-outline" size={48} color="#ef4444" />
        <Text className="mt-4 text-red-500 text-center px-4">
          Error loading data: {error.message}
        </Text>
      </View>
    )
  }

  if (!histories || histories.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <MaterialIcons name="analytics" size={48} color="#9ca3af" />
        <Text className="mt-4 text-gray-500 text-center px-4">
          No data available for the selected period
        </Text>
      </View>
    )
  }

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-4">
        {/* Header */}
        <Animated.View
          entering={FadeInDown.delay(200).springify()}
          className="mb-6"
        >
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-2xl font-bold text-gray-800">
                Analytics Dashboard
              </Text>
              <Text className="text-gray-500">
                Track your store performance
              </Text>
            </View>
            <View className="flex-row items-center space-x-2">
              <TouchableOpacity
                onPress={downloadCSV}
                className="bg-blue-100 p-3 rounded-full"
              >
                <MaterialIcons name="file-download" size={24} color="#2563eb" />
              </TouchableOpacity>
              <View className="bg-emerald-100 p-3 rounded-full">
                <MaterialIcons name="insights" size={24} color="#059669" />
              </View>
            </View>
          </View>

          {/* Time Filter Buttons */}
          <View className="flex-row mt-4 space-x-2">
            {(['day', 'week', 'month'] as TimeFilter[]).map((filter) => (
              <TouchableOpacity
                key={filter}
                onPress={() => setTimeFilter(filter)}
                className={`px-4 py-2 rounded-full flex-row items-center space-x-1 ${
                  timeFilter === filter
                    ? 'bg-emerald-500 shadow-sm'
                    : 'bg-white shadow-sm'
                }`}
              >
                <MaterialIcons
                  name={
                    filter === 'day'
                      ? 'today'
                      : filter === 'week'
                        ? 'date-range'
                        : 'calendar-month'
                  }
                  size={16}
                  color={timeFilter === filter ? '#ffffff' : '#6B7280'}
                />
                <Text
                  className={`${
                    timeFilter === filter ? 'text-white' : 'text-gray-600'
                  } font-medium`}
                >
                  {filter === 'day'
                    ? 'Today'
                    : filter === 'week'
                      ? 'This Week'
                      : 'This Month'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* Sales Overview */}
        <Animated.View
          entering={FadeInDown.delay(400).springify()}
          className="mb-6"
        >
          <View className="flex-row items-center justify-between mb-4">
            <View>
              <Text className="text-lg font-semibold text-gray-800">
                Food Orders Statistics
              </Text>
              <Text className="text-gray-500 text-sm">
                {timeFilter === 'day'
                  ? "Today's food orders"
                  : timeFilter === 'week'
                    ? "This week's food orders"
                    : "This month's food orders"}
              </Text>
            </View>
          </View>

          {/* Category Filter */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Filter by Category
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="flex-row space-x-2"
            >
              {['All', FoodType.VEGETABLE, FoodType.FRUITS, FoodType.MEAT, FoodType.SNACKS, FoodType.DRINKS, FoodType.RICE, FoodType.OTHER].map((category) => (
                <TouchableOpacity
                  key={category}
                  onPress={() => setCategoryFilter(category as CategoryFilter)}
                  className={`px-4 py-2 rounded-full ${
                    categoryFilter === category
                      ? 'bg-blue-500 shadow-sm'
                      : 'bg-white shadow-sm border border-gray-200'
                  }`}
                >
                  <Text
                    className={`${
                      categoryFilter === category
                        ? 'text-white font-semibold'
                        : 'text-gray-700'
                    }`}
                  >
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <BlurView
            intensity={20}
            tint="light"
            className="rounded-2xl overflow-hidden"
          >
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.7)']}
              className="p-4 rounded-2xl"
            >
              {/* Summary Cards */}
              <View className="flex-row justify-between mb-4">
                <SummaryCard
                  title="Total Sales"
                  value={stats.totalSales}
                  trend={stats.growth}
                  icon="trending-up"
                  iconColor="#059669"
                  bgColor="bg-emerald-500"
                  textColor="text-black"
                  timeFilter={timeFilter}
                />
                <SummaryCard
                  title="Orders"
                  value={stats.totalOrders}
                  icon="shopping-cart-checkout"
                  iconColor="#2563eb"
                  bgColor="bg-blue-500"
                  textColor="text-black"
                  subtitle={`${stats.averageOrderValue.toFixed(2)} avg. order`}
                />
              </View>

              {/* Chart */}
              <SalesChart data={lineData} timeFilter={timeFilter} />

              {/* Time Range Indicator */}
              <TimeRangeIndicator timeFilter={timeFilter} />
            </LinearGradient>
          </BlurView>
        </Animated.View>

        {/* Stats Grid */}
        <Animated.View
          entering={FadeInDown.delay(600).springify()}
          className="flex-row flex-wrap justify-between mb-6"
        >
          {statsData.map((stat, index) => (
            <View key={index} className="w-[48%] mb-4">
              <BlurView
                intensity={20}
                tint="light"
                className="rounded-2xl overflow-hidden"
              >
                <LinearGradient
                  colors={[
                    'rgba(255, 255, 255, 0.9)',
                    'rgba(255, 255, 255, 0.7)',
                  ]}
                  className="p-4 rounded-2xl"
                >
                  <View className="flex-row items-center justify-between">
                    <View>
                      <Text className="text-gray-500 text-sm">
                        {stat.title}
                      </Text>
                      <Text className="text-xl font-bold text-gray-800 mt-1">
                        {stat.value}
                      </Text>
                    </View>
                    <View className="bg-gray-100 p-2 rounded-full">
                      {stat.icon === 'currency-php' ? (
                        <MaterialCommunityIcons
                          name="currency-php"
                          size={24}
                          color={stat.color}
                        />
                      ) : (
                        <MaterialIcons
                          name={stat.icon}
                          size={24}
                          color={stat.color}
                        />
                      )}
                    </View>
                  </View>
                </LinearGradient>
              </BlurView>
            </View>
          ))}
        </Animated.View>

        {/* Weekly Orders */}
        {/* <Animated.View
          entering={FadeInDown.delay(800).springify()}
          className="mb-6"
        >
          <View className="flex-row items-center justify-between mb-4">
            <View>
              <Text className="text-lg font-semibold text-gray-800">
                Weekly Orders
              </Text>
              <Text className="text-gray-500 text-sm">Last 7 days</Text>
            </View>
            <TouchableOpacity className="bg-gray-100 p-2 rounded-full">
              <MaterialIcons name="more-horiz" size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>
          <BlurView
            intensity={20}
            tint="light"
            className="rounded-2xl overflow-hidden"
          >
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.7)']}
              className="p-4 rounded-2xl"
            >
              <BarChart
                data={barData}
                width={width - 48}
                height={220}
                chartConfig={chartConfig}
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
                showValuesOnTopOfBars
                yAxisLabel=""
                yAxisSuffix=""
                fromZero
                segments={5}
              />
            </LinearGradient>
          </BlurView>
        </Animated.View> */}

        {/* Recent Activity */}
        {/* <Animated.View entering={FadeInDown.delay(1000).springify()}>
          <View className="flex-row items-center justify-between mb-4">
            <View>
              <Text className="text-lg font-semibold text-gray-800">
                Recent Activity
              </Text>
              <Text className="text-gray-500 text-sm">Latest transactions</Text>
            </View>
            <TouchableOpacity className="bg-gray-100 p-2 rounded-full">
              <MaterialIcons name="more-horiz" size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>
          <BlurView
            intensity={20}
            tint="light"
            className="rounded-2xl overflow-hidden"
          >
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.7)']}
              className="p-4 rounded-2xl"
            >
              {histories?.slice(0, 3).map((history, index) => (
                <Animated.View
                  key={history.id}
                  entering={FadeInRight.delay(1200 + index * 200).springify()}
                  className="flex-row items-center py-3 border-b border-gray-100 last:border-0"
                >
                  <View className="bg-emerald-100 p-2 rounded-full mr-3">
                    <MaterialIcons
                      name="shopping-cart"
                      size={20}
                      color="#059669"
                    />
                  </View>
                  <View className="flex-1">
                    <Text className="text-gray-800 font-medium">
                      Order #{history.id.slice(-4)}
                    </Text>
                    <Text className="text-gray-500 text-sm">
                      {format(history.createdAt.toDate(), 'MMM d, h:mm a')}
                    </Text>
                  </View>
                  <View className="items-end">
                    <Text className="text-emerald-600 font-semibold">
                      ₱{history.totalPrice.toFixed(2)}
                    </Text>
                    <Text className="text-emerald-500 text-xs">
                      Qty: {history.quantity}
                    </Text>
                  </View>
                </Animated.View>
              ))}
            </LinearGradient>
          </BlurView>
        </Animated.View> */}
      </View>
    </ScrollView>
  )
}

export default ViewAnalytics
