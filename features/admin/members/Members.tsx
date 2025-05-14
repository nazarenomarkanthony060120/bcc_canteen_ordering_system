import { View, Text } from 'react-native'
import React from 'react'
import Admin from '../Admin'
import MembersHeader from './component/MembersHeader'
import MembersFormCard from './component/MembersFormCard'

const Members = () => {
  return (
    <Admin className="flex-1 bg-[#ccffcc] px-2">
      <MembersHeader />
      <MembersFormCard />
    </Admin>
  )
}

export default Members
