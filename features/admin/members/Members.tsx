import React from 'react'
import MembersHeader from './component/MembersHeader'
import MembersFormCard from './component/MembersFormCard'
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'

const Members = () => {
  return (
    <LinearGradient
      colors={['#6a11cb', '#2575fc']}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView className="flex-1 px-2 w-full">
        <MembersHeader />
        <MembersFormCard />
      </SafeAreaView>
    </LinearGradient>
  )
}

export default Members
