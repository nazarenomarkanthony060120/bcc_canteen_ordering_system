import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import { LinearGradient } from 'expo-linear-gradient'

const { width } = Dimensions.get('window')

type TimeFilter = 'day' | 'week' | 'month'

interface SalesChartProps {
  data: any
  timeFilter: TimeFilter
}

const SalesChart = ({ data, timeFilter }: SalesChartProps) => {
  const chartConfig = {
    backgroundColor: 'transparent',
    backgroundGradientFrom: 'transparent',
    backgroundGradientTo: 'transparent',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(5, 150, 105, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: '#059669',
    },
    formatYLabel: (value: string) => {
      const num = parseFloat(value)
      return num >= 1000 ? `${(num / 1000).toFixed(0)}k` : num.toFixed(0)
    },
    formatXLabel: (value: string) => {
      if (timeFilter === 'day') {
        const hour = parseInt(value)
        return hour % 4 === 0 ? `${hour}:00` : ''
      }
      if (timeFilter === 'week') {
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        return days[parseInt(value) % 7]
      }
      if (timeFilter === 'month') {
        const day = parseInt(value)
        return day % 7 === 0 ? `${day}` : ''
      }
      return value
    },
    yAxisInterval: 1,
    yAxisSuffix: '',
    yAxisLabel: '',
    fillShadowGradient: '#059669',
    fillShadowGradientOpacity: 0.1,
    propsForBackgroundLines: {
      strokeWidth: 1,
      stroke: 'rgba(229, 231, 235, 0.5)',
      strokeDasharray: '0',
    },
    propsForLabels: {
      fontSize: 10,
      rotation: 0,
      dx: 0,
      dy: 0,
    },
    count: timeFilter === 'day' ? 6 : timeFilter === 'week' ? 7 : 5,
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 20,
  }

  // Adjust data points based on time filter
  const adjustedData = {
    ...data,
    labels: data.labels.map((label: string, index: number, arr: string[]) => {
      if (timeFilter === 'day') {
        return index % 4 === 0 ? label : ''
      }
      if (timeFilter === 'week') {
        return label
      }
      if (timeFilter === 'month') {
        // Show only 1st, 8th, 15th, 22nd, and last day
        const daysInMonth = arr.length
        if (
          index === 0 ||
          index === 7 ||
          index === 14 ||
          index === 21 ||
          index === daysInMonth - 1
        ) {
          return label
        }
        return ''
      }
      return label
    }),
  }

  return (
    <View className="mb-2">
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.7)']}
        className="p-4 rounded-2xl"
      >
        <LineChart
          key={adjustedData.id}
          data={adjustedData}
          width={width - 64}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
          withDots={true}
          withShadow={true}
          withInnerLines={true}
          withOuterLines={true}
          withVerticalLines={false}
          segments={5}
          renderDotContent={({ x, y, index, indexData }) => {
            // Place the label directly on the dot, always inside the chart
            return (
              <View
                key={index}
                style={{
                  position: 'absolute',
                  top: y - 12, // Center vertically on the dot
                  left: x - 18, // Center horizontally on the dot
                  backgroundColor: 'rgba(5, 150, 105, 0.15)',
                  paddingHorizontal: 4,
                  paddingVertical: 1,
                  borderRadius: 6,
                  borderWidth: 0.5,
                  borderColor: 'rgba(5, 150, 105, 0.2)',
                  minWidth: 32,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{ color: '#059669', fontSize: 9, fontWeight: '500' }}
                >
                  ₱{indexData.toFixed(0)}
                </Text>
              </View>
            )
          }}
        />
      </LinearGradient>
    </View>
  )
}

export default SalesChart
