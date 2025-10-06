import React from 'react'
import { View, Dimensions } from 'react-native'
import { BarChart } from 'react-native-chart-kit'
import { LinearGradient } from 'expo-linear-gradient'

const { width } = Dimensions.get('window')

type TimeFilter = 'day' | 'week' | 'month'

interface SalesChartProps {
  data: any
  timeFilter: TimeFilter
}

const SalesChart = ({ data, timeFilter }: SalesChartProps) => {
  // Calculate max value from data
  const maxDataValue = Math.max(...(data.datasets[0]?.data || [0]))

  // Default max is 10, but adjust if data exceeds it
  // Always round up to nearest even number to maintain interval of 2
  const yAxisMax = maxDataValue <= 10 ? 12 : Math.ceil(maxDataValue / 2) * 2

  const chartConfig = {
    backgroundColor: 'white',
    backgroundGradientFrom: 'white',
    backgroundGradientTo: 'white',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(217, 158, 44, ${opacity})`, // Gold/orange color
    labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    formatYLabel: (value: string) => {
      const num = parseFloat(value)
      return Math.round(num).toString()
    },
    formatXLabel: (value: string) => value, // Show food names as-is
    formatTopBarValue: (value: number) => {
      // Hide value if it's the yAxisMax (invisible bar)
      if (value === yAxisMax) {
        return ''
      }
      return value.toString()
    },
    yAxisSuffix: '',
    yAxisLabel: '',
    propsForBackgroundLines: {
      strokeWidth: 1,
      stroke: 'rgba(229, 231, 235, 0.5)',
      strokeDasharray: '0',
    },
    propsForLabels: {
      fontSize: 10,
    },
    paddingRight: 20,
    paddingLeft: 0,
  }

  // Force the y-axis scale by ensuring data includes the max value
  const actualData = data.datasets[0]?.data || []

  // Create custom colors array to make the last bar transparent
  const barColors = actualData.map(
    () => (opacity: number) => `rgba(217, 158, 44, ${opacity})`,
  ) // Gold for actual bars
  barColors.push(() => 'rgba(255, 255, 255, 1)') // White to match background - invisible bar

  const adjustedData = {
    labels: [...data.labels, ''], // Add empty label for the invisible max value
    datasets: [
      {
        data: [...actualData, yAxisMax], // Add max value to force scale
        colors: barColors, // Custom colors for each bar
      },
    ],
  }

  return (
    <View className="mb-2">
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.7)']}
        className="p-4 rounded-2xl"
      >
        <BarChart
          data={adjustedData}
          width={width - 64}
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
          withCustomBarColorFromData
          flatColor
        />
      </LinearGradient>
    </View>
  )
}

export default SalesChart
