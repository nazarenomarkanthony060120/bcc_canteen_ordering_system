import { View, Text, ScrollView, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useMemo, useState } from 'react'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { BarChart } from 'react-native-chart-kit'
import { LinearGradient } from 'expo-linear-gradient'
import { BlurView } from 'expo-blur'
import { useGetHistories } from '@/hooks/useQuery/seller/get/useGetHistories'
import { format, subDays, subMonths, startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns'
import { useAuth } from '@/context/auth'
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated'
import SummaryCard from './components/SummaryCard'
import SalesChart from './components/SalesChart'
import TimeRangeIndicator from './components/TimeRangeIndicator'

const { width } = Dimensions.get('window')

type TimeFilter = 'day' | 'week' | 'month'

interface ViewAnalyticsProps {
    storeId: string  | null
}
const ViewAnalytics = ({storeId}: ViewAnalyticsProps) => {
  const { user } = useAuth()
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('day')
  const {
    data: histories,
    isLoading,
    error,
  } = useGetHistories({ storeId: storeId })

  console.log('Histories:', histories) // Debug log
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

    return histories.filter(history => {
      const historyDate = history.createdAt.toDate()
      return historyDate >= startDate && historyDate <= endDate
    })
  }, [histories, timeFilter])

  const stats = useMemo(() => {
    if (!histories || histories.length === 0) {
      console.log('No histories data available')
      return {
        totalSales: 0,
        totalOrders: 0,
        averageOrderValue: 0,
        growth: 0,
      }
    }

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
    const currentPeriodSales = histories.reduce((sum, history) => {
      const historyDate = history.createdAt.toDate()
      if (historyDate >= currentPeriodStart && historyDate <= currentPeriodEnd) {
        return sum + history.totalPrice
      }
      return sum
    }, 0)

    // Calculate previous period sales
    const previousPeriodSales = histories.reduce((sum, history) => {
      const historyDate = history.createdAt.toDate()
      if (historyDate >= previousPeriodStart && historyDate <= previousPeriodEnd) {
        return sum + history.totalPrice
      }
      return sum
    }, 0)

    console.log('Growth calculation:', {
      timeFilter,
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

    const totalOrders = histories.filter(history => {
      const historyDate = history.createdAt.toDate()
      return historyDate >= currentPeriodStart && historyDate <= currentPeriodEnd
    }).length

    const averageOrderValue = totalOrders > 0 ? currentPeriodSales / totalOrders : 0

    // Calculate growth percentage
    let growth = 0
    if (previousPeriodSales > 0) {
      growth = ((currentPeriodSales - previousPeriodSales) / previousPeriodSales) * 100
    } else if (currentPeriodSales > 0) {
      growth = 100 // If there were no sales in previous period but there are sales now, that's 100% growth
    }

    return {
      totalSales: currentPeriodSales,
      totalOrders,
      averageOrderValue,
      growth,
    }
  }, [histories, timeFilter])

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
    if (!histories || histories.length === 0) {
      console.log('No data for line chart')
      return {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{ data: [0, 0, 0, 0, 0, 0], color: () => '', strokeWidth: 2 }],
      }
    }

    let labels: string[]
    let data: number[]

    switch (timeFilter) {
      case 'day':
        // Show hourly data for the day
        labels = Array.from({ length: 24 }, (_, i) => `${i}:00`)
        data = labels.map(hour => {
          const [hourNum] = hour.split(':').map(Number)
          const hourStart = new Date()
          hourStart.setHours(hourNum, 0, 0, 0)
          const hourEnd = new Date(hourStart)
          hourEnd.setHours(hourNum + 1, 0, 0, 0)

          return histories.reduce((sum, history) => {
            const historyDate = history.createdAt.toDate()
            if (historyDate >= hourStart && historyDate < hourEnd) {
              return sum + history.totalPrice
            }
            return sum
          }, 0)
        })
        break

      case 'week':
        // Show daily data for the week
        labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        const weekStart = startOfWeek(new Date())
        data = labels.map((_, index) => {
          const dayStart = new Date(weekStart)
          dayStart.setDate(weekStart.getDate() + index)
          const dayEnd = new Date(dayStart)
          dayEnd.setDate(dayStart.getDate() + 1)

          return histories.reduce((sum, history) => {
            const historyDate = history.createdAt.toDate()
            if (historyDate >= dayStart && historyDate < dayEnd) {
              return sum + history.totalPrice
            }
            return sum
          }, 0)
        })
        break

      case 'month':
        // Show daily data for the month
        const monthStart = startOfMonth(new Date())
        const daysInMonth = new Date(
          monthStart.getFullYear(),
          monthStart.getMonth() + 1,
          0
        ).getDate()
        
        labels = Array.from({ length: daysInMonth }, (_, i) => `${i + 1}`)
        data = labels.map((_, index) => {
          const dayStart = new Date(monthStart)
          dayStart.setDate(monthStart.getDate() + index)
          const dayEnd = new Date(dayStart)
          dayEnd.setDate(dayStart.getDate() + 1)

          return histories.reduce((sum, history) => {
            const historyDate = history.createdAt.toDate()
            if (historyDate >= dayStart && historyDate < dayEnd) {
              return sum + history.totalPrice
            }
            return sum
          }, 0)
        })
        break
    }

    console.log('Line chart data:', { labels, data })

    return {
      labels,
      datasets: [{
        data,
        color: (opacity = 1) => `rgba(5, 150, 105, ${opacity})`,
        strokeWidth: 2,
      }],
    }
  }, [histories, timeFilter])

  const barData = useMemo(() => {
    if (!filteredHistories || filteredHistories.length === 0) {
      console.log('No data for bar chart') // Debug log
      return {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{ data: [0, 0, 0, 0, 0, 0, 0] }],
      }
    }

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    const today = new Date()
    const startOfWeek = new Date(today)
    startOfWeek.setDate(today.getDate() - today.getDay() + 1)

    const weeklyData = days.map((_, index) => {
      const dayStart = new Date(startOfWeek)
      dayStart.setDate(startOfWeek.getDate() + index)
      const dayEnd = new Date(dayStart)
      dayEnd.setDate(dayStart.getDate() + 1)

      const dayOrders = filteredHistories.filter((history) => {
        const orderDate = history.createdAt.toDate()
        return orderDate >= dayStart && orderDate < dayEnd
      })

      return dayOrders.length
    })

    console.log('Bar chart data:', { labels: days, data: weeklyData }) // Debug log

    return {
      labels: days,
      datasets: [
        {
          data: weeklyData,
        },
      ],
    }
  }, [filteredHistories])

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

  if (isLoading) {
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
            <View>
              <Text className="text-2xl font-bold text-gray-800">
                Analytics Dashboard
              </Text>
              <Text className="text-gray-500">
                Track your store performance
              </Text>
            </View>
            <View className="bg-emerald-100 p-3 rounded-full">
              <MaterialIcons name="insights" size={24} color="#059669" />
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
                Sales Overview
              </Text>
              <Text className="text-gray-500 text-sm">
                {timeFilter === 'day'
                  ? "Today's hourly sales"
                  : timeFilter === 'week'
                  ? "This week's daily sales"
                  : "This month's daily sales"}
              </Text>
            </View>
          </View>

          <BlurView intensity={20} tint="light" className="rounded-2xl overflow-hidden">
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
                  textColor="text-white"
                  timeFilter={timeFilter}
                />
                <SummaryCard
                  title="Orders"
                  value={stats.totalOrders}
                  icon="shopping-cart-checkout"
                  iconColor="#2563eb"
                  bgColor="bg-blue-500"
                  textColor="text-white"
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
              <BlurView intensity={20} tint="light" className="rounded-2xl overflow-hidden">
                <LinearGradient
                  colors={['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.7)']}
                  className="p-4 rounded-2xl"
                >
                  <View className="flex-row items-center justify-between">
                    <View>
                      <Text className="text-gray-500 text-sm">{stat.title}</Text>
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
        <Animated.View 
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
          <BlurView intensity={20} tint="light" className="rounded-2xl overflow-hidden">
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
        </Animated.View>

        {/* Recent Activity */}
        <Animated.View 
          entering={FadeInDown.delay(1000).springify()}
        >
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
          <BlurView intensity={20} tint="light" className="rounded-2xl overflow-hidden">
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
        </Animated.View>
      </View>
    </ScrollView>
  )
}

export default ViewAnalytics
