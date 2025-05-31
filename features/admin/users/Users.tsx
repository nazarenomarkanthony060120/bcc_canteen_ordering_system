import React from 'react'
import Admin from '../Admin'
import { LinearGradient } from 'expo-linear-gradient'
import UsersHeader from './component/UsersHeader'
import UsersFormCard from './component/UsersFormCard'
import { SafeAreaView } from 'react-native-safe-area-context'

const Users = () => {
  return (
    <Admin className="flex-1">
      <LinearGradient
        colors={['#6a11cb', '#2575fc']}
        style={{ flex: 1 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <SafeAreaView className="p-2 mb-5 gap-1">
          <UsersHeader />
          <UsersFormCard />
        </SafeAreaView>
      </LinearGradient>
    </Admin>
  )
}

export default Users
