import React from 'react'
import MembersHeader from './component/MembersHeader'
import MembersFormCard from './component/MembersFormCard'
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import Admin from '../Admin'

const Members = () => {
  return (
    <Admin className="flex-1">
      <LinearGradient
        colors={['#6a11cb', '#2575fc']}
        style={{ flex: 1 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <SafeAreaView className="px-2">
          <MembersHeader />
          <MembersFormCard />
        </SafeAreaView>
      </LinearGradient>
    </Admin>
  )
}

export default Members
