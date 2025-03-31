import { Text } from 'react-native'
import React from 'react'
import Layout from '../../common/Layout'

const Foods = ({ params}: any) => {
  return (
    <Layout>
      <Text className='text-white'>Foods {params.id}</Text>
    </Layout>
  )
}

export default Foods